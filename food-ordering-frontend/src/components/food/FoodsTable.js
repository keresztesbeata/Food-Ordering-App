import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {Notification, NOTIFICATION_TYPES} from "../Notification";
import {getSessionItem, SESSION_KEY} from "../../api/utils";
import {deleteFood, getCategoriesList, getFoodsByRestaurant} from "../../api/foodsApi";
import {FoodForm} from "./FoodForm";

export const FoodsTable = () => {
    const [notification, setNotification] = useState({show: false, message: "", type: NOTIFICATION_TYPES.ERROR});
    const [selectedFood, setSelectedFood] = useState(null);
    const [refresh, setRefresh] = useState(true);
    const [hiddenForm, setHiddenForm] = useState(true);
    const [foods, setFoods] = useState([]);
    const [allCategories, setAllCategories] = useState([]);

    const onDeleteFood = (id) => {
        deleteFood(id)
            .then(deletedFood => {
                setNotification({
                    message: "Success!",
                    details: `Food item ${deletedFood.name} has been successfully deleted!`,
                    show: true,
                    type: NOTIFICATION_TYPES.INFO
                });
                setRefresh(true);
            })
            .catch(error => {
                setNotification({
                    show: true,
                    message: error.message,
                    details: error.details,
                    type: NOTIFICATION_TYPES.ERROR
                })
            });
    }

    useEffect(() => {
        const restaurant = getSessionItem(SESSION_KEY.RESTAURANT_KEY);
        getFoodsByRestaurant(restaurant.name)
            .then(data => setFoods(data))
            .catch(error => setNotification({
                show: true,
                message: error.message,
                details: error.details,
                type: NOTIFICATION_TYPES.ERROR
            }));
        getCategoriesList()
            .then(data => setAllCategories(data))
            .catch(error => console.log(error));
        setRefresh(false);
    }, [refresh, setRefresh])

    const onResetForm = () => {
        setSelectedFood(null);
    }

    return (
        <div className={"table-container"}>
            <Button variant="success"
                    onClick={() => {
                        onResetForm();
                        setHiddenForm(false);
                    }}>New</Button>

            <FoodForm food={selectedFood} categories={allCategories} onRefresh={setRefresh}
                      hidden={hiddenForm} setHidden={setHiddenForm}/>
            <Notification data={notification}/>
            <Table striped hover responsive>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Portion size</th>
                    <th>Ingredients</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {
                    foods.map(elem =>
                        <tr id={elem._id}>
                            <td>{elem.name}</td>
                            <td>{elem.category}</td>
                            <td>{elem.price}</td>
                            <td>{elem.portion_size}</td>
                            <td>{elem.ingredients.toString().replaceAll(",", ", ")}</td>
                            <td>
                                <Button variant="outline-primary"
                                        onClick={() => {
                                            setSelectedFood(elem);
                                            setHiddenForm(false);
                                        }}>Edit</Button>
                            </td>
                            <td>
                                <Button variant="outline-danger"
                                        onClick={() => onDeleteFood(elem._id)}>Delete</Button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </Table>
        </div>
    );
};