import React from 'react';

const MainContent = () => {
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Welcome to Our Service</h1>
            <p className="text-lg mb-6">Experience the best rides with us. Fast, reliable, and safe.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Feature 1</h2>
                    <p>Details about feature 1.</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Feature 2</h2>
                    <p>Details about feature 2.</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                    <h2 className="text-xl font-semibold">Feature 3</h2>
                    <p>Details about feature 3.</p>
                </div>
            </div>
        </div>
    );
};

export default MainContent;