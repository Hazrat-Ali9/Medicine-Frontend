import React, { useState, useEffect } from 'react';

const Attention = () => {
    const [holidays, setHolidays] = useState([]);

    useEffect(() => {
        // Assuming the holiday data is dynamic, you can use an API or predefined data
        const currentMonth = new Date().getMonth(); // Get the current month (0-11)

        const holidayData = {
            1: ['Language Movement Day (February 21)'], // February
            2: ['Pohela Boishakh (April 14)'], // April
            3: ['May Day (May 1)', 'Eid-ul-Fitr (May 20-21)'], // May
            4: ['Independence Day (March 26)'], // March
            5: ['Eid-ul-Adha (July 5-6)'], // July
            6: ['National Mourning Day (August 15)'], // August
            7: ['Durga Puja (October 5)'], // October
            8: ['Victory Day (December 16)'], // December
            9: ['Pohela Boishakh (April 14)'], // April
            10: ['Labor Day (November 1)'], // November
            11: ['Christmas (December 25)'], // December
        };

        setHolidays(holidayData[currentMonth] || []);
    }, []);

    return (
        <div className="md:w-11/12 md:mx-auto bg-gradient-to-r from-teal-100 via-teal-400 to-teal-100 p-6 rounded-lg shadow-lg text-white">
            <div className="relative mb-20">
                <div className="absolute animate-marquee whitespace-nowrap">
                    <p className="text-lg font-semibold">
                        🚨 Get ready for the biggest sale of the year! 🚨 🚗 All new products available now! 🚗 🛒
                    </p>
                </div>
            </div>

            {/* New Section with Website Open/Close Date, Order Time and Holidays */}
            <div className="text-center mt-6 p-6  text-black rounded-lg">
                <p className="text-lg font-semibold text-blue-600">
                    🎉 Our website is open for business from <strong>January 21, 2025</strong> until <strong>January 28, 2025</strong>!
                </p>
                <p className="text-lg font-medium text-gray-700 mt-2">
                    🕒 Orders can be placed between <strong>9:00 AM</strong> and <strong>8:00 PM</strong> daily.
                </p>
                <div className="mt-4">
                    <h3 className="font-semibold text-xl text-gray-800">This Month's Holidays:</h3>
                    <ul className="list-disc list-inside mt-2">
                        {holidays.length === 0 ? (
                            <li>No holidays this month!</li>
                        ) : (
                            holidays.map((holiday, index) => (
                                <li key={index} className="text-gray-600">{holiday}</li>
                            ))
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Attention;
