import React, {useEffect, useState} from "react";

const featureData = [
    {
        name: "Pizza 1",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        name: "Pizza 2",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        name: "Pizza 3",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }, {
        name: "Pizza 4",
        ingredients: "dough, tomato sauce, onion, salami, mozzarella",
        price: 123.5,
        portion_size: 400,
        category: "Pizza"
    }
];

export const Home = () => {
    const ALL_CATEGORIES = "All";
    const [category, setCategory] = useState(ALL_CATEGORIES);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        if (category === ALL_CATEGORIES) {
            setAllProducts(allProducts);
        } else {
            const filteredProducts = allProducts.filter((item) => item.category === category);
            setAllProducts(filteredProducts);
        }
    }, [category]);

    return (
        <div>

        </div>
    );
};