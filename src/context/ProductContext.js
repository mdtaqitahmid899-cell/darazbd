"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    writeBatch,
    getDocs,
    getDoc,
    updateDoc
} from "firebase/firestore";

const ProductContext = createContext();

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    // Real-time sync with Firestore
    useEffect(() => {
        const loadInitialData = async () => {
            console.log("%c--- Firebase Connection Test ---", "color: #ff9900; font-weight: bold; font-size: 14px;");
            console.log("Active Project ID:", db.app.options.projectId);
            console.log("App Name:", db.app.name);

            try {
                const productsRef = collection(db, "products");
                console.log("Testing manual fetch (getDocs)...");
                const testSnapshot = await getDocs(query(productsRef));
                console.log("%cManual fetch success!", "color: #22c55e; font-weight: bold;");
                console.log("Documents found in 'products':", testSnapshot.size);
            } catch (err) {
                console.error("%cManual fetch FAILED:", "color: #ef4444; font-weight: bold;", err);
                console.log("Manual Fetch Error JSON:", JSON.stringify(err, Object.getOwnPropertyNames(err)));

                if (err.code === 'permission-denied') {
                    console.warn("ADVICE: Double check your Firestore Rules. Make sure you clicked 'PUBLISH'.");
                    console.warn("Match path: match /databases/{database}/documents");
                }
            }
        };

        loadInitialData();

        const productsRef = collection(db, "products");
        const q = query(productsRef);

        console.log("Starting real-time onSnapshot listener...");
        const unsubscribe = onSnapshot(q, (snapshot) => {
            console.log("Real-time update received. Count:", snapshot.size);
            const productsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProducts(productsData);
            setLoading(false);
            setIsLoaded(true);
        }, (error) => {
            console.error("onSnapshot failed!");
            console.error("Error Code:", error.code);
            console.error("Error Message:", error.message);
            console.log("Full Error Object:", JSON.stringify(error, Object.getOwnPropertyNames(error)));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const addProduct = async (productData) => {
        try {
            const productsRef = collection(db, "products");
            await addDoc(productsRef, {
                ...productData,
                createdAt: new Date().toISOString(),
                // Default stats if not provided
                rating: productData.rating || 5.0,
                reviewCount: productData.reviewCount || 0,
                reviews: productData.reviews || []
            });
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product to database.");
        }
    };

    const deleteProduct = async (id) => {
        try {
            await deleteDoc(doc(db, "products", id));
        } catch (error) {
            console.error("Error deleting product:", error);
        }
    };

    const addReview = async (productId, reviewData) => {
        try {
            const productRef = doc(db, "products", productId);
            const productDoc = await getDoc(productRef);

            if (productDoc.exists()) {
                const product = productDoc.data();
                const newReviews = [
                    ...(product.reviews || []),
                    {
                        ...reviewData,
                        date: new Date().toISOString()
                    }
                ];

                // Calculate new average rating
                const totalRating = newReviews.reduce((sum, r) => sum + Number(r.rating), 0);
                const newRating = (totalRating / newReviews.length).toFixed(1);

                await updateDoc(productRef, {
                    reviews: newReviews,
                    rating: parseFloat(newRating),
                    reviewCount: newReviews.length
                });
            }
        } catch (error) {
            console.error("Error adding review:", error);
            throw error;
        }
    };

    const clearAllProducts = async () => {
        if (confirm("Are you sure you want to remove ALL products from the database? This will affect all devices.")) {
            try {
                const productsRef = collection(db, "products");
                const snapshot = await getDocs(productsRef);
                const batch = writeBatch(db);

                snapshot.docs.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();
            } catch (error) {
                console.error("Error clearing products:", error);
            }
        }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, deleteProduct, addReview, clearAllProducts, isLoaded, loading }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
