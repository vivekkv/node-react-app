import React from 'react';
import Styles from '../styles.css';

export default class LatestNews extends React.Component {

    render() {

        let footerCategories = _.filter(this.props.landingPage.get("lstLandingPage").toArray(), (i) => { return i.type == "PRODUCTS" })

        return <div className="news-section">
            <div className="container-fluid">
               <div className={Styles.latest_products}>

               <div className="col-md-3 news-column">
                    <img className="img-responsive" src="/assets/images/latestProducts/pneumatic_piston_filler.png" title="name" />
                    <br />
                    <h4>Pneumatic Piston Filler</h4>
                    <br />
                    <p>We bring forth highly efficient Pneumatic Piston Filler. Our Pneumatic Piston Filler is a highly versatile, user-friendly and robust filling machine. These Pneumatic Piston Fillers handle water thin to highly viscous products like gel, ghee, honey, curry paste, pickle etc. Our Pneumatic Piston Filler can be obtained at competitive prices. We can provide fully automatic pickle jam & sauce line with following optional attachments.</p>
                </div>

                <div className="col-md-3 news-column">

                    <img className="img-responsive" src="/assets/images/latestProducts/fluid_bed_dryer.png" title="name" />
                    <br />
                    <h4>Fluid Bed Dryer</h4>
                    <br />
                    <p>We introduce one of the finest Fluid Bed Dryer. Our Fluid Bed Dryer provides compactness and is operated on the principle of Air Fluidization for drying granules, Crystalline, Coarse or similar materials in Pharmaceuticals, Fine Chemicals, Dyes, Food & Allied industries. The basic concept of the Fluid Bed Dryer begins with a simple drying to which several different optional packages may be added for conversion to a granulator or coater.</p>


                </div>

                <div className="col-md-3 news-column">

                    <img className="img-responsive" src="/assets/images/latestProducts/double_cone_blender.png" title="name" />
                    <br />
                    <h4>Double Cone Blende</h4>
                    <br />
                    <p>We introduce one of the finest Fluid Bed Dryer. Our Fluid Bed Dryer provides compactness and is operated on the principle of Air Fluidization for drying granules, Crystalline, Coarse or similar materials in Pharmaceuticals, Fine Chemicals, Dyes, Food & Allied industries. The basic concept of the Fluid Bed Dryer begins with a simple drying to which several different optional packages may be added for conversion to a granulator or coate.</p>


                </div>
                
                <div className="col-md-3 news-column">

                    <img className="img-responsive" src="/assets/images/latestProducts/fruid_mill.png" title="name" />
                    <br />
                    <h4>Fruit Mill</h4>
                    <br />
                    <p>Being one of the prime Manufacturers, Exporters, and Suppliers in India, the company offers world class Fruit Mill. Designed to perfection, the Fruit Mill provided by us is extensively used for fine grinding of hard and seedless fruits. Widely known for its superior quality and precise designing, our industrial grade Fruit Mill guarantees efficiency and durability. All the parts fitted in the Fruit Mill is made from food grade stainless steel. Furthermore, the clients can avail this Fruit Mill/ Crusher in diverse specifications, that too at industry leading prices from us</p>

                </div>

               </div>
            </div>
        </div>
    }
}