import { Edit, Calendar, User, Mail, MapPin, Pencil } from 'lucide-react';

export default function MyProfile() {
    // Dummy user data
    const user = {
        firstname: "John",
        lastname: "Doe",
        dob: "1995-06-15",
        gender: "Male",
        email: "johndoe@example.com",
        address: "123 Main Street, Nairobi, Kenya",
    };

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
        <div className="max-w-md mx-auto">
            <div className="bg-white rounded-2xl p-8 text-center border border-blue-100 shadow-sm hover:shadow-md transition-all">
                <div className="relative mx-auto w-32 h-32 mb-6">
                    <img
                        src="/images/nipe-mchongo.jpeg"
                        alt="Profile"
                        className="rounded-full w-full h-full object-cover border-4 border-blue-200 shadow-inner"
                    />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1.5 shadow-md">
                        <Edit className="h-5 w-5 text-white" />
                    </div>
                </div>

                <h3 className="text-2xl font-bold text-blue-900 mb-1">
                    {user.firstname} <span className="text-blue-700">{user.lastname}</span>
                </h3>

                <div className="flex justify-center space-x-4 mb-4">
                    <span className="inline-flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <Calendar className="h-4 w-4 mr-1" />
                        {calculateAge(user.dob)} years
                    </span>
                    <span className="inline-flex items-center text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        <User className="h-4 w-4 mr-1" />
                        {user.gender}
                    </span>
                </div>

                <div className="space-y-3 mb-6 text-left bg-blue-50 rounded-xl p-4">
                    <div className="flex items-start">
                        <Mail className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-blue-800">{user.email}</span>
                    </div>
                    <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-blue-400 mt-0.5 mr-3 flex-shrink-0" />
                        <span className="text-blue-800">{user.address}</span>
                    </div>
                </div>

                <button className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all flex items-center justify-center">
                    <Pencil className="h-5 w-5 mr-2" />
                    Update Profile
                </button>
            </div>
        </div>
    );
}
