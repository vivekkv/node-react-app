import { callApi } from 'utils/request';
import Promise from 'bluebird';
import { List } from 'immutable';

export function getProductDetails() {

    return new Promise((resolve, reject) => {

        callApi("product/getProducts", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'productList': List(response.data.data) });

            } else {

                resolve();
            }

        });

    })

}

export function getProductInfo(productId) {

    return new Promise((resolve, reject) => {

        callApi("product/productInfo?productId="+ productId, {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {
                resolve({ 'productInfo': response.data.data });

            } else {

                resolve();
            }

        });

    })

}

export function getPortfolio() {

    return new Promise((resolve, reject) => {

        callApi("product/getPortfolio", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'portfolioList': List(response.data.data) });

            } else {

                resolve();
            }

        });

    })

}

export function getNavigationData() {

    return new Promise((resolve, reject) => {

        // request("/", {
        // 	method: "GET"
        // }).then((response) => {

        // 	if (response.completed && response.data.Server.Success) {

        // 		let list = response.data.Server.Data;
        // 		resolve({ 'lstProducts': List(list) });

        // 	} else {

        // 		resolve();
        // 	}

        // });

        let products = getProducts();
        let firstCategoryNode = getFirstCategory(products);

        resolve({ 'lstProducts': List(products), 'selectedCategoryNode': firstCategoryNode });

    });
}

export function getProductList() {

    return new Promise((resolve, reject) => {

        callApi("product", {
            method: "GET"
        }).then((response) => {

            if (response.completed && response.data.success) {

                resolve({ 'productList': List(response.data.data) });

            } else {

                resolve();
            }

        });

    });
}


function getFirstCategory(products, parent) {

    let firstCategoryNode = null;

    for (let i = 0; i < products.length; i++) {

        let item = products[i];

        if (item.to) {

            firstCategoryNode = parent;
            break;

        } else if (item.content) {

            return getFirstCategory(item.content, item)
        }
    }

    return firstCategoryNode;
}

function getProducts() {

    return [{
        'label': "Industry",
        'content': [{
            'label': "Hotels and Restaurants",
            'content': [{
                "label": "Salamander",
                "description": "SS made, heating up controlled by a symosthat, Galvanized steel gridiron and heating elements protection grill, Easy",
                "image": ["12543982001814804.jpeg"],
                'to': '1'
            },
            {
                "label": "Multi Utility Grinders",
                "description": "We have sincerely adopted latest market trends for manufacturing and supplying a vast array of Spiral Mixer.",
                "image": ["13757079075641096.jpeg"],
                'to': '2'
            },
            {
                "label": "Potato Peeler",
                "description": "Potato peeler is made up SS drum with standard emery plate for peeling root vegetables of large quantity various capacity in lesser time with minimal cost. This machine is user friendly in handling, cleaning and maintenance. Also reduce wastage and water consumption is very low. The machine output helps in producing fresh peeled vegetables at the time of cooking..",
                "image": ["13757729262458376.jpeg"],
                'to': '3'
            },
            {
                "label": "Dough Kneaders",
                "description": "Dough kneaders helps preparing Attas with various capacities in a lesser time. Attas are kneaded in hygienic manner with equal proportion and exact output. This machine are very much user friendly for many places with safety..",
                "image": ["13760478317868415.jpeg"],
                'to': '4'
            },
            {
                "label": "Dough Dividers",
                "description": "Dough Divider helps in making a dough balls with various sizes and the sizes can be adjusted based on the user requirement.",
                "image": ["137553095827815562.jpeg"],
                'to': '5'
            },
            {
                "label": "Boiling Pan",
                "description": "Ever since our inception, we have been fruitfully engaged in manufacturing and supplying a large stock of Boiling Pan. These pans are indirect water heating equipment that are integrated with double water jacketed frames. Our pans are extensively used in many commercial kitchens for bulk boiling of milk, rice pulses, pulses and vegetables. Before foal dispatch, we duly inspect the line of Boiling Pan on the basis of durability and functionality.",
                "image": ["137578727774446092.jpeg"],
                'to': '6'
            },
            {
                "label": "Pressure Bratt Pan",
                "description": "We are well established in the market as one of the foremost manufacturers and suppliers of Pressure Bratt Pan. These ",
                "image": ["137578850781282744.jpeg"],
                'to': '7'
            },
            {
                "label": "Vegetable Cutters",
                "description": "Floor standing Vegetable Preparation Machine with a full moon with Feeder. This is also available in a lockable model for environments in which extra safety is a high priority. The blades are interchangeable and very sharp in order to deliver perfect cutting results. The machine has two speeds.",
                "image": ["137578993860354101.jpeg"],
                'to': '8'
            },
            {
                "label": "Spiral Mixer",
                "description": "We have sincerely adopted latest market trends for manufacturing and supplying a vast array of Spiral Mixer. These mixers are sturdily structured and are ideally used for mixing the bulk amount of dough efficiently. Our mixers are demanded in big and commercial kitchens to accurately mix the thicker density dough for pizza, bun and bread. Additionally, we make available the complete array of Spiral Mixer to the clients within committed time lines and at feasible prices.",
                "image": ["137596064814014159.jpeg"],
                'to': '9'
            },
            {
                "label": "Citrus Juicers",
                "description": "Citrus juicer is to use everywhere you need a freshly squeezed citrus juice: health food stores, hotels, bars, restaurants..",
                "image": ["137604420174740204.jpeg"],
                'to': '10'
            },
            {
                "label": "Meat Mincers",
                "description": "A meat grinder or meat mincer is a kitchen appliance for fine chopping ( mincing ) and/or mixing of raw or cooked meat, fish, vegetables or similar food.",
                "image": ["137604581551330143.jpeg"],
                'to': '10'
            },
            {
                "label": "Tilting Wet Masala Grinders",
                "description": "COSMOS TWMG shall benefit you in many ways. It is capable of grinding Coconut & onion chutneys, Masala Grinding, ginger garlic pasting, tomato pureeing and it can also do coarse grinding of dry powdering of spices, etc.",
                "image": ["137604981569287187.jpeg"],
                'to': '11'
            }]
        }]
    }, {
        'label': "Process",
        'content': [{
            'label': "Pre-Preparation",
            'to': 2
        }]
    }]
}