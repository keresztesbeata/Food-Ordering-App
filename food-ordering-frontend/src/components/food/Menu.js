import React, {useEffect, useState} from "react";
import {Dropdown} from "react-bootstrap";
import {FoodsList} from "./FoodsList";

const allCategories = ["All", "Appetizers", "Pizza", "Pasta", "Soup", "Dessert", "Main"];

export const Menu = (props) => {
    const [category, setCategory] = useState("All");
    const [allItems, setAllItems] = useState(props.menu);

    useEffect(() => {
        if (category === "All") {
            setAllItems(props.menu);
        } else {
            const filteredItems = props.menu.filter((item) => item.category === category);
            setAllItems(filteredItems);
        }
    }, [category, props.menu]);

    const onSelectCategory = (event) => {
        setCategory(event.target.value);
    }

    const displayCategories = () => {
        return allCategories.map(category =>
            <Dropdown.Item as={"button"} value={category} key={category}
                           onClick={onSelectCategory}>{category}
            </Dropdown.Item>)
    }

    const displayFoods = () => {
        return category === "All" ?
            allCategories.filter(category => category !== "All")
                .map(c => {
                    const filteredItems = allItems.filter(foodData => foodData.category === c);
                    return filteredItems.length > 0 ?
                        <FoodsList data={filteredItems} category={c}/>
                        :
                        <div/>
                })
            :
            allItems.length > 0 ?
                <FoodsList data={allItems} category={category}/>
                :
                <p>No foods exist in the category {category}!</p>
    }

    return (
        props.menu.length > 0 ?
            <div>
                <Dropdown>
                    <Dropdown.Toggle variant={"success"}>
                        {category}
                    </Dropdown.Toggle>
                    <Dropdown.Menu variant={"success"}>
                        {displayCategories()}
                    </Dropdown.Menu>
                </Dropdown>
                {displayFoods()}
            </div>
            :
            <div/>
    );
}
