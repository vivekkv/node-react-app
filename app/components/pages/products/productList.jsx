import React from 'react';
import reduxAction from 'reduxImplementations/reduxActionHelper';
import Styles from './styles';

export default class ProductList extends React.Component {

    render() {

        let categoryNode = this.props.data.get("categoryProductList");
        let productLists = categoryNode ? categoryNode.toArray() : [];
        productLists = _.orderBy(productLists, "id", "desc")

        return <ul className={Styles.product_listing}>

            {
                productLists.map((product, index) => {

                    return <li key={index}>

                        <h3>{product.name}</h3> 
                    
                        {
                            product.images[0] ? <div className={Styles.image_wrapper}><img src={"/assets/uploads/" + product.images[0].path} />
                            </div> : <div className={Styles.image_wrapper}><img src={"assets/images/no-image-available.png"} /></div>
                        }

                        
                        <p>{product.description}</p>
                        <a href={"/#/product/detail/" + product.category_id +"/" + product.id}>Details</a>

                    </li>

                })
            }

        </ul>

    }
}