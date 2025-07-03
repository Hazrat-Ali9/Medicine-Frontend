import React from "react";

const sponsors = [
    {
        name: "Square Pharmaceuticals Ltd.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT05YJirEhnPKmRqDFvIFUAtdQl311XS_wCEw&s",
    },
    {
        name: "Incepta Pharmaceuticals Ltd.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsrx36n8QYCF_cws1SmXjlmviqRFtp5ijh6A&s",
    },
    {
        name: "Beximco Pharmaceuticals Ltd.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBrcuLsx6HaEUy1LHmgjJLN-LZu0x6W8h29Q&s",
    },
    {
        name: "Renata Limited",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQEOc2PCpLBjZfyg_pqNN5phuHiXo0Q08fovQ&s",
    },
    {
        name: "ACI Limited (Advanced Chemical Industries)",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTynHsJq4Zu4VqrkMuiBbPyimYxm8n45CVEdA&s",
    },
];

const SponsorList = () => {
    return (
        <div>
            <h2 className="text-3xl font-bold text-center my-10 md:mt-44">
                A Heartfelt Thanks to Our Valued Sponsors
            </h2>
            <div className="flex flex-wrap justify-center gap-4 p-6">
                {sponsors.map((sponsor, index) => (
                    <div
                        key={index}
                        className="p-4 bg-white rounded-lg shadow-md text-center w-64"
                    >
                        <img
                            src={sponsor.image}
                            alt={sponsor.name}
                            className="h-60 w-full object-cover rounded-md"
                        />
                        <h3 className="mt-4 text-lg font-semibold text-gray-700">
                            {sponsor.name}
                        </h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SponsorList;
