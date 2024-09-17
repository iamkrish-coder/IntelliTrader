import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperLineChart from './SwiperLineChart';
import { SVGICON } from '../../constant/theme';

const swiperData = [
    { color: 'bg-secondary', amount: '65,123', chartcolor: 'rgba(163, 199, 241, 1) ', svgicon: SVGICON.SwiperPepSvg },
    { color: 'bg-pink', amount: '68,123', chartcolor: 'rgba(229, 159, 241, 1)', svgicon: SVGICON.SwiperEthSvg },
    { color: 'bg-dark', amount: '66,123', chartcolor: 'rgba(148, 150, 176, 1)', svgicon: SVGICON.SwiperEthSvg },
    { color: 'bg-warning', amount: '67,123', chartcolor: 'rgba(247, 215, 168, 1)', svgicon: SVGICON.SwiperBitSvg },
    { color: 'bg-pink', amount: '68,123', chartcolor: 'rgba(229, 159, 241, 1)', svgicon: SVGICON.SwiperEthSvg },
    { color: 'bg-warning', amount: '67,123', chartcolor: 'rgba(247, 215, 168, 1)', svgicon: SVGICON.SwiperBitSvg },
];

const MainSlider = () => {
    return (
        <>
            <Swiper
                className="mySwiper-counter position-relative overflow-hidden"
                slidesPerView={4}
                speed={1500}
                spaceBetween={40}
                // rtl={true}
                parallax={true}
                loop={false}
                autoplay={{
                    delay: 5000,
                }}
                breakpoints={{
                    300: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1200: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {swiperData.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className={`card card-box bg-secondary ${item.color}`}>
                            <div className="card-header border-0 pb-0">
                                <div className="chart-num">
                                    <p>
                                        <i className="fa-solid fa-sort-down me-2" />
                                        4%(30 days)
                                    </p>
                                    <h2 className="font-w600 mb-0">${item.amount}</h2>
                                </div>
                                <div className="dlab-swiper-circle">
                                    {item.svgicon}
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div id="widgetChart1" className="chart-primary">
                                    <SwiperLineChart chartcolor={item.chartcolor} />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    );
};

export default MainSlider;