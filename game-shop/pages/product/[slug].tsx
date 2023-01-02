import {client, urlFor} from "../../lib/client";
import {AiOutlineMinus, AiOutlinePlus, AiFillStar, AiOutlineStar} from "react-icons/ai";
import {Product} from "../../components";
import {useState} from "react";
import {useStateContext} from "../../context/StateContext";

function ProductDetails({product, products}:any) {
    const {image, name, details, price} = product;
    const [index, setIndex] = useState(0);
    // @ts-ignore
    const {decQty, incQty, qty, onAdd, setShowCart} = useStateContext();

    function handleBuyNow() {
        onAdd(product, qty);
        setShowCart(true);
    }

    return(
        <div>
            <div className="product-detail-container">
                <div>
                    <div className="image-container">
                        <img src={`${urlFor(image && image[index])}`} className="product-detail-image"/>
                    </div>
                    <div className="small-images-container">
                        {image.map((item:any, i:any) => {
                            return <img key={i}
                                src={`${urlFor(item)}`}
                                className={i === index ? "small-image selected-image" : 'small-image'}
                                onMouseEnter={() => setIndex(i)}
                            />
                        })}
                    </div>
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className="reviews">
                        <div>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiFillStar/>
                            <AiOutlineStar/>
                        </div>
                        <p>(20)</p>
                    </div>
                    <h4>Details: </h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>
                    <div className="quantity">
                        <h3>Quantity: </h3>
                        <p className="quantity-desc">
                            <span className="minus" onClick={decQty}><AiOutlineMinus/></span>
                            <span className="num" >{qty}</span>
                            <span className="plus" onClick={incQty}><AiOutlinePlus/></span>
                        </p>
                    </div>
                    <div className="buttons">
                        <button type="button" className="add-to-cart" onClick={() => onAdd(product, qty)}>Add to Cart</button>
                        <button type="button" className="buy-now" onClick={handleBuyNow}>Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="maylike-products-wrapper">
                <h2>You may also like</h2>
                <div className="marquee">
                    <div className="maylike-products-container track">
                        {
                            products.map((item:any) => {
                                return <Product key={item._id} product={item}/>
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails

export async function getStaticPaths() {
    const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;
    const products = await client.fetch(query);
    const path = products.map((product:any) => ({
        params: {
            slug: product.slug.current
        }
    }))

    return {
        paths: path,
        fallback:'blocking',
    }
}

export async function getStaticProps({params:{slug}}:any) {
    const query  = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]';

    const product = await client.fetch(query);
    const products = await client.fetch(productsQuery);
    return {
        props: {
            products,
            product
        }
    }
}