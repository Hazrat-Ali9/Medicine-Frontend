import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules'; // Navigation এবং Pagination ইমপোর্ট
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Category_item from './Category_item';

const Category_products_items = ({ items }) => {
    return (
        <div className="relative my-8">
            <Swiper
                modules={[Navigation, Pagination]} // Navigation এবং Pagination মোডিউল
                spaceBetween={20} // স্লাইডগুলোর মধ্যে গ্যাপ
                slidesPerView={1} // Default: ১টি স্লাইড
                breakpoints={{
                    640: { slidesPerView: 1, spaceBetween: 20 },
                    768: { slidesPerView: 2, spaceBetween: 25 },
                    1024: { slidesPerView: 3, spaceBetween: 30 },
                    1280: { slidesPerView: 3, spaceBetween: 5,  },
                    1536: { slidesPerView: 4, spaceBetween: 5 }, 
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }} // Custom Navigation Buttons
                pagination={{
                    clickable: true,
                    dynamicBullets: true, // ডট সংখ্যা কমানোর জন্য Dynamic Bullets
                }}
                className="mySwiper"
            >
                {items.map(item => (
                    <SwiperSlide key={item._id}>
                        <div className="p-2 gap-6"> {/* প্রতিটি কার্ডে padding যোগ করা */}
                            <Category_item Category_item_product={item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            
        </div>
    );
};

export default Category_products_items;
