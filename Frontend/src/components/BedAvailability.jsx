import React, { useState } from 'react';
import bedImage from '../images/1140-hospital-room.webp'; // Updated image path

function BedAvailability() {
    const [selectedLocation, setSelectedLocation] = useState('');
    const [selectedBedType, setSelectedBedType] = useState('');
    const [filteredHospitals, setFilteredHospitals] = useState([]);

    const hospitalData = [
        { name: 'Max Super Specialty Hospital', location: 'Noida', beds: ['ICU', 'NICU', 'General Ward'] },
        { name: 'Max Super Specialty Hospital', location: 'Bangalore', beds: ['Cancer Care Unit', 'General Ward', 'Private Room'] },
        { name: 'Narayana Health', location: 'Visakhapatnam', beds: ['General Ward', 'Private Room', 'ICU', 'NICU'] },
        { name: 'Narayana Health', location: 'Delhi', beds: ['Emergency Room', 'Cancer Care Unit', 'NICU', 'ICU'] },
        { name: 'Fortis Healthcare', location: 'Bhopal', beds: ['ICU', 'NICU'] },
        { name: 'Artemis Hospital', location: 'Thane', beds: ['General Ward', 'ICU', 'Cancer Care Unit', 'Private Room'] },
        { name: "Rainbow Children's Hospital", location: 'Chandigarh', beds: ['General Ward'] },
        { name: 'SevenHills Hospital', location: 'Surat', beds: ['Cancer Care Unit', 'Emergency Room', 'NICU'] },
        { name: 'BLK-Max Super Specialty Hospital', location: 'Bhopal', beds: ['Burn Unit', 'ICU'] },
        { name: 'Sankara Nethralaya', location: 'Ahmedabad', beds: ['Cancer Care Unit'] },
    ];

    // Extract unique locations and bed types
    const locations = [...new Set(hospitalData.map((hospital) => hospital.location))];
    const bedTypes = [
        ...new Set(hospitalData.flatMap((hospital) => hospital.beds)),
    ];

    const handleLocationChange = (e) => {
        setSelectedLocation(e.target.value);
        setSelectedBedType(''); // Reset bed type when location changes
        setFilteredHospitals([]); // Clear filtered hospitals when location changes
    };

    const handleBedTypeChange = (e) => {
        const bedType = e.target.value;
        setSelectedBedType(bedType);

        // Filter hospitals based on selected location and bed type
        const results = hospitalData.filter(
            (hospital) =>
                hospital.location === selectedLocation && hospital.beds.includes(bedType)
        );
        setFilteredHospitals(results);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
            style={{ backgroundImage: `url(${bedImage})` }} // Updated background image
        >
            <div className="bg-black bg-opacity-50 p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-4xl font-bold mb-6 text-center">Bed Availability</h1>

                <div className="mb-4">
                    <label htmlFor="location" className="block text-lg font-medium mb-2">
                        Select Location
                    </label>
                    <select
                        id="location"
                        className="w-full p-2 rounded-lg text-black"
                        value={selectedLocation}
                        onChange={handleLocationChange}
                    >
                        <option value="">-- Choose a Location --</option>
                        {locations.map((location) => (
                            <option key={location} value={location}>
                                {location}
                            </option>
                        ))}
                    </select>
                </div>

                {selectedLocation && (
                    <div className="mb-4">
                        <label htmlFor="bedType" className="block text-lg font-medium mb-2">
                            Select Bed Type
                        </label>
                        <select
                            id="bedType"
                            className="w-full p-2 rounded-lg text-black"
                            value={selectedBedType}
                            onChange={handleBedTypeChange}
                        >
                            <option value="">-- Choose a Bed Type --</option>
                            {bedTypes.map((bedType) => (
                                <option key={bedType} value={bedType}>
                                    {bedType}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {filteredHospitals.length > 0 && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-bold mb-4">Hospitals with Available Beds</h2>
                        <ul className="list-disc list-inside">
                            {filteredHospitals.map((hospital, index) => (
                                <li key={index} className="text-lg">
                                    {hospital.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {selectedBedType && filteredHospitals.length === 0 && (
                    <div className="mt-6">
                        <p className="text-lg text-center text-red-500">
                            No hospitals found with the selected bed type in this location.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BedAvailability;
