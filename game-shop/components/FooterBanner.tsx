import React from 'react';
import Link from 'next/link';
import {urlFor} from "../lib/client";
import product from "./Product";

function FooterBanner({footerBanner}:any) {
    return (
        <div className='footer-banner-container'>
            <div className="banner-desc">
                <div className="left">
                    <p>{footerBanner.discount}</p>
                    <h3>{footerBanner.largeText1}</h3>
                    <h3>{footerBanner.largeText2}</h3>
                    <p>{footerBanner.saleTime}</p>
                </div>
                <div className="right">
                    <p>{footerBanner.smallText}</p>
                    <h3>{footerBanner.midText}</h3>
                    <p>{footerBanner.desc}</p>
                    <Link href={`/product/${product}`}>
                        <button type="button">{footerBanner.buttonText}</button>
                    </Link>
                </div>
                <img src={`${urlFor(footerBanner.image)}`} alt="" className="footer-banner-image"/>
            </div>
        </div>
    )
}

export default FooterBanner;