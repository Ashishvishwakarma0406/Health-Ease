import React from "react";

// Import images from the 'src' folder using relative paths
import imgNutrition from '../images/images (2).jpg'; // Nutrition related image
import imgFitness from '../images/images (3).jpg'; // Physical fitness related image
import imgMentalHealth from '../images/fb2498a8dc4aaf1298a6dd96f17aa6b4.avif'; // Mental illness related image
import imgBloodDonation from '../images/images (1).jpg'; // Blood donation related image
import imgDoctors from '../images/doctor.png'; // Doctors related image
import imgAmbulance from '../images/ambulance.png.jpg'; // Ambulance related image

const articles = [
  {
    title: "The Importance of Nutrition in Daily Life",
    imagePath: imgNutrition,
    content:
      "Nutrition is essential for maintaining good health. Eating a balanced diet helps boost immunity, enhance energy levels, and prevent chronic diseases. Nutrition is vital for maintaining good health and supporting the body’s daily functions. A balanced diet provides essential nutrients such as carbohydrates, proteins, fats, vitamins, and minerals, which are crucial for energy, growth, immune function, and overall well-being. Eating a variety of foods, including fruits, vegetables, whole grains, lean proteins, and healthy fats, ensures that the body receives the necessary nutrients for optimal performance. Proper nutrition helps maintain a healthy weight, supports brain function, strengthens the immune system, and reduces the risk of chronic diseases. A well-balanced diet is key to promoting long-term health and vitality.",
  },
  {
    title: "Physical Fitness: A Step Towards a Healthier Life",
    imagePath: imgFitness,
    content:
      "Physical fitness is essential for overall health and well-being. Regular exercise improves cardiovascular health, strengthens muscles, enhances flexibility, and supports a healthy body composition. Activities like running, swimming, and weightlifting help prevent chronic diseases such as heart disease, diabetes, and obesity. Exercise also boosts mental health by releasing endorphins, which reduce stress and improve mood. Additionally, it enhances cognitive function, improves sleep, and increases energy levels. Incorporating a mix of aerobic, strength, and flexibility exercises into daily life can lead to long-term benefits..",
  },
  {
    title: "Mental Health Awareness: Breaking the Stigma",
    imagePath: imgMentalHealth,
    content:
      "Mental health is as important as physical health.Mental health is essential for overall well-being, influencing how we handle stress, relationships, and decision-making. Prioritizing mental health improves emotional resilience, coping mechanisms, and life satisfaction. Addressing mental health challenges, such as anxiety or depression, promotes healthier communities. Early intervention and support networks, such as therapy and peer groups, are vital in overcoming struggles. Promoting awareness and providing support can help individuals lead happier lives. Mental health is a crucial aspect of overall well-being, affecting how we think, feel, and act. It influences how we handle stress, relate to others, and make decisions. Good mental health promotes emotional resilience, allowing individuals to cope with life’s challenges and maintain healthy relationships. Mental health issues, such as anxiety, depression, and stress, can impact daily life but can be managed through therapy, support, and healthy coping mechanisms. Taking care of mental health is just as important as physical health, and seeking help when needed is essential for maintaining a balanced and fulfilling life.",
  },
  {
    title: "The Power of Blood Donation: Saving Lives",
    imagePath: imgBloodDonation,
    content:
      "Blood donation is a selfless act that can save lives. Donating blood helps maintain a steady supply for emergencies and medical procedures. Blood donation is a life-saving act that plays a critical role in healthcare. Donating blood helps maintain an adequate supply for patients in need, including those undergoing surgery, trauma victims, cancer patients, and individuals with chronic conditions like anemia. Each donation can save up to three lives, as blood is separated into components like red blood cells, plasma, and platelets, which are used for different medical treatments. The process is safe, quick, and minimally invasive. By regularly donating blood, individuals contribute to their community's health and well-being, making a significant impact on saving lives.",
  },
  {
    title: "The Role of Doctors in Modern Healthcare",
    imagePath: imgDoctors,
    content:
      "Doctors are the backbone of healthcare.Doctors are essential in providing compassionate care, promoting preventative health, and enhancing community well-being. They collaborate with healthcare teams, conduct research, and shape medical advancements. Their expertise and dedication ensure the well-being of patients, improving quality of life. Doctors play a vital role in modern healthcare, serving as the primary providers of medical care and guidance. Their expertise helps diagnose, treat, and prevent various health conditions, ensuring patients receive the right care at the right time. Beyond clinical duties, doctors educate patients about healthy lifestyle choices, disease prevention, and management of chronic conditions. They collaborate with other healthcare professionals to develop comprehensive treatment plans, ensuring holistic care. Doctors also contribute to medical research, advancing healthcare practices and improving patient outcomes. Their dedication and knowledge are essential in maintaining the health and well-being of individuals and communities.",
  },
  {
    title: "Ambulance Services: A Lifeline in Emergencies",
    imagePath: imgAmbulance,
    content:
      "Ambulance services play a critical role in saving lives during emergencies. They ensure timely transport of patients to healthcare facilities, particularly in life-threatening situations like accidents, heart attacks, or strokes. Ambulances are equipped with essential medical equipment and staffed by trained paramedics who can stabilize patients and administer emergency care while en route. Fast and efficient ambulance services significantly improve survival rates and reduce the severity of injuries. Their prompt response can make the difference between life and death, highlighting their vital role in emergency healthcare systems and community well-being. Quick response times and medical care during transport are vital for survival.",
  },
];

function Articles() {
  return (
    <div className="flex flex-col items-center mt-24 space-y-6 px-4"> {/* Increased mt-24 for more space */}
      {articles.map((article, index) => (
        <div
          key={index}
          className="flex flex-col md:flex-row items-center md:items-start bg-white shadow-md rounded-lg p-6 w-full md:w-3/4"
        >
          <div className="flex-shrink-0 w-full md:w-1/3">
            <img
              src={article.imagePath}
              alt={article.title}
              className="w-full h-full rounded-lg object-cover"  // Adjusted to ensure the image takes the full height of the article
            />
          </div>
          <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
            <h2 className="text-xl font-bold">{article.title}</h2>
            <p className="mt-2 text-gray-700">{article.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Articles;
