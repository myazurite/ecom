import React from 'react';
import Link from 'next/link';
import {urlFor} from "../lib/client";

function Product({product}:any) {
    return(
        <Link href={`/product/${product.slug.current}`}>
            <div className="product-card">
                <img
                    src={`${urlFor(product.image && product.image[0])}`} alt=""
                    width={250}
                    height={250}
                />
                <p className="product-name">{product.name}</p>
                <p className="product-price">${product.price}</p>
            </div>
        </Link>
    )
}

export default Product;

