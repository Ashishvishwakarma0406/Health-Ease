import React from 'react';

function BloodDonationPage() {
  return (
    <div
      style={{
        backgroundImage: "url('/images/image.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        padding: '20px',
        minHeight: '100vh',
      }}
      className="flex flex-col items-center justify-start text-center mt-[8vh]"
    >
      {/* Heading */}
      <h1 className="text-4xl font-bold text-white">
        WE, THE YOUTH, CAN MAKE INDIA
      </h1>
      <h2 className="text-3xl font-bold text-red-600 mt-2">BLOOD BANK</h2>

      {/* Description */}
      <p className="mt-4 text-lg text-gray-700 max-w-[800px]">
        We provide a <strong>360° solution</strong> to the problem from
        motivating people to donate blood to helping them donate and finally
        helping anyone in dire need via a helpline.
      </p>

      {/* Blood Group Compatibility Tables */}
      <div className="flex flex-wrap justify-center mt-8 gap-4">
        <div className="bg-pink-100 border border-gray-300 p-4 rounded-md shadow-md">
          <table className="table-auto text-left">
            <thead>
              <tr>
                <th className="border px-4 py-2">TYPE</th>
                <th className="border px-4 py-2">YOU CAN GIVE BLOOD TO</th>
                <th className="border px-4 py-2">YOU CAN RECEIVE BLOOD FROM</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border px-4 py-2">A+</td>
                <td className="border px-4 py-2">A+, AB+</td>
                <td className="border px-4 py-2">A+, A-, O+, O-</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">O+</td>
                <td className="border px-4 py-2">O+, A+, B+, AB+</td>
                <td className="border px-4 py-2">O+, O-</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">B+</td>
                <td className="border px-4 py-2">B+, AB+</td>
                <td className="border px-4 py-2">B+, B-, O+, O-</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">AB</td>
                <td className="border px-4 py-2">AB+</td>
                <td className="border px-4 py-2">Everyone</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-4">
        <button
          className="bg-red-600 text-white px-6 py-3 rounded-md shadow hover:bg-red-700 transition"
          onClick={() => alert('Donate Blood Form')}
        >
          Donate Blood
        </button>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
          onClick={() => alert('Search for Blood Donors')}
        >
          Search for Blood Donors
        </button>
      </div>
    </div>
  );
}

export default BloodDonationPage;
