export default function MyProfile() {
    // Dummy user data for testing
    const user = {
        firstname: "John",
        lastname: "Doe",
        dob: "1995-06-15",
        gender: "Male",
        email: "johndoe@example.com",
        address: "123 Main Street, Nairobi, Kenya",
    };

    // Calculate age from DOB
    const calculateAge = (birthdate) => {
        const today = new Date();
        const birthDate = new Date(birthdate);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    return (
        <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="relative mx-auto w-32 h-32 mb-6">
                    <img
                        src="/images/nipe-mchongo.jpeg"
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover border-4 border-blue-200 shadow-inner"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5 shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-blue-900 mb-1">
                    {user.firstname} <span className="text-blue-700">{user.lastname}</span>
                </h3>

                <div className="flex justify-center space-x-4 mb-4">
                    <span className="inline-flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {calculateAge(user.dob)} years
                    </span>
                    <span className="inline-flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {user.gender}
                    </span>
                </div>

                <div className="space-y-3 mb-6 text-left bg-blue-50 rounded-xl p-4">
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-blue-800">{user.email}</span>
                    </div>
                    <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-blue-800">{user.address}</span>
                    </div>
                </div>

                <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Update Profile
                </button>
            </div>
        </div>
    );
}
