import React from 'react'

function CategoriesBar() {
  const categories = [
    { name: "Conference", image: "/conference.jpg", type: "CONFERENCE"},
    { name: "Workshop", image: "/workshop.webp", type: "WORKSHOP" },
    { name: "Concert", image: "/concert.jpg", type: "CONCERT" },
    { name: "Sport", image: "/Sport.jpg", type: "SPORT" },
  ];

  const handleCategoryClick = (categoryType) => {
    window.location.href = `/events?category=${categoryType}`;
  };
      
  return (
    <div>
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Explore Categories
        </h2>
        <div className="flex justify-evenly gap-10 mx-auto">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className="text-center cursor-pointer"
              onClick={() => handleCategoryClick(category.type)}
            >
              <div className="w-48 h-48 mx-auto rounded-full overflow-hidden transform bg-indigo-400 hover:bg-indigo-600 transition duration-500 hover:scale-110 flex justify-center items-center">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-5 text-xl text-gray-700">{category.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoriesBar