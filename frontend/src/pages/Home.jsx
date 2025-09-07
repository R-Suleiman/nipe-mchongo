import React from "react";
import {
    FaSearch,
    FaEdit,
    FaComments,
    FaUserCheck,
    FaRocket,
    FaHandshake,
    FaUserPlus,
    FaRegSmile,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AboutImage from '../assets/images/about.png';
import logo from '../assets/images/logo.png';
import { FaBolt } from "react-icons/fa";
import { FaBullhorn } from "react-icons/fa";
import { FaMobileAlt, FaThumbsUp, FaClock, FaUsers } from "react-icons/fa";
import { FaQuoteLeft, FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { CheckCircle, Smartphone, Users, ThumbsUp } from "lucide-react";



export default function Home() {
    return (
        <div classNameName="text-white">
            <nav className="sticky top-0 z-50 bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center space-x-2">
                            <img src={logo} className="h-22 w-full" />
                        </div>

                        <div className="md:flex space-x-4 items-center font-mormal">
                            <a href="#signup"
                                className="bg-orange-500 text-center text-white px-4 py-2 rounded-sm hover:bg-orange-500 transition">Jiunge</a>
                            <a href="#signup"
                                className="bg-blue-900 text-center text-white px-4 py-2 rounded-sm hover:bg-blue-700 transition">Ingia</a>
                        </div>

                    </div>
                </div>
            </nav>
            {/* Hero Section */}
            <section
                className="relative h-[580px] flex items-center justify-center px-6 md:px-12 bg-gradient-to-br from-white via-white to-blue-100 text-gray-900" id="home">
                <div className="absolute inset-0 "></div>
                <div className="absolute inset-0 bg-opacity-10"></div>
                <div className="relative max-w-4xl bg-opacity-80 text-center text-blue-900">
                    <h2 className="text-2xl md:text-3xl font-medium leading-tight text-orange-500">Nipe Mchongo</h2>
                    <hr className="h-1 mx-auto my-1 bg-blue-900 w-10"></hr>
                    <h1 className="text-[25px] md:text-5xl font-extrabold leading-tight mb-6">
                        Badilisha maisha yako Kupitia Fursa za Ajira
                    </h1>
                    <p
                        className="font-stylish text-md md:text-lg text-gray-600  max-w-3xl mx-auto mb-8 leading-relaxed">
                        Nipe Mchongo inakuunganisha moja kwa moja na waajiri na michongo kila siku.
                    </p>


                    <div className="inline-flex items-center text-white px-4 py-2 rounded shadow-lg space-x-3">
                        <div className="flex space-x-1">
                            <svg className="w-5 h-5 fill-current text-orange-500" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                            </svg>
                            <svg className="w-5 h-5 fill-current text-orange-500" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                            </svg>
                            <svg className="w-5 h-5 fill-current text-orange-500" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                            </svg>
                            <svg className="w-5 h-5 fill-current text-orange-500" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                            </svg>
                            <svg className="w-5 h-5 fill-current text-orange-500" viewBox="0 0 20 20" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.974a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.388 2.462a1 1 0 00-.364 1.118l1.287 3.974c.3.921-.755 1.688-1.54 1.118l-3.388-2.462a1 1 0 00-1.175 0l-3.388 2.462c-.784.57-1.838-.197-1.539-1.118l1.287-3.974a1 1 0 00-.364-1.118L2.045 9.4c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.974z" />
                            </svg>
                        </div>
                    </div>

                </div>
                <div
                    className="hidden md:flex absolute bottom-[5%] left-10 right-10 justify-between max-w-7xl mx-auto px-4 overflow-hidden">
                    <a href="#signup"
                        className="bg-orange-500 text-center text-white px-4 py-2 rounded-sm font-medium hover:bg-orange-500 transition">Jiunge sasa</a>
                    <a href="#learnmore"
                        className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-semibold px-3 py-3 rounded shadow-lg transition duration-300 whitespace-nowrap">
                        Jifunze Zaidi
                    </a>
                </div>
            </section>


            {/* About Nipe Mchongo */}
            <section className="bg-white py-20 px-6 md:px-16" id="about">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Left content */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4 text-blue-900">
                            Kuhusu <span className="text-orange-500">Nipe Mchongo</span>
                        </h2>
                        <p className="text-gray-700 leading-relaxed mb-2">
                            <span className="font-semibold">Nipe Mchongo</span> ni jukwaa
                            la kidijitali linalounganisha watu wanaotafuta nafasi na fursa za
                            kazi, biashara, na miradi na wale wanaozitoa. Hapa ndipo
                            unapopata mchongo wa haraka, sahihi, na wenye kuaminika.
                        </p>
                        <p className="text-gray-700 text-base mb-10">
                            Tunarahisisha upatikanaji wa taarifa muhimu za fursa, tunakuunganisha na
                            watoa huduma, waajiri, na wajasiriamali, huku tukitumia teknolojia ya
                            kisasa kuhakikisha hupitwi na mchongo wowote.
                        </p>

                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
                            <div className="flex flex-col items-center text-center space-y-3">
                                <FaHandshake className="text-3xl text-orange-600" />
                                <h4 className="font-semibold text-gray-800 text-base">Fursa Halisi</h4>
                                <p className="text-sm text-gray-600 max-w-xs">
                                    Pata nafasi na mikataba halisi kutoka kwa waajiri na watoa huduma.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center space-y-3">
                                <FaBolt className="text-3xl text-blue-600" />
                                <h4 className="font-semibold text-gray-800 text-base">Upatikanaji Haraka</h4>
                                <p className="text-sm text-gray-600 max-w-xs">
                                    Pokea mchongo papo hapo bila kusubiri muda mrefu au kupoteza nafasi.
                                </p>
                            </div>

                            <div className="flex flex-col items-center text-center space-y-3">
                                <FaBullhorn className="text-3xl text-green-600" />
                                <h4 className="font-semibold text-gray-800 text-base">Kujitangaza</h4>
                                <p className="text-sm text-gray-600 max-w-xs">
                                    Tangaza huduma zako na uonekane na wateja na wabia wapya.
                                </p>
                            </div>
                        </div>

                        {/* CTA button */}
                        <div className="mt-6">
                            <a
                                href="#join"
                                className="inline-block bg-orange-500 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded-sm transition duration-300"
                            >
                                Jiunge
                            </a>
                        </div>
                    </div>

                    {/* Right image */}
                    <div className="relative w-full h-90 md:h-[460px] rounded-xl overflow-hidden">
                        <img src={AboutImage} alt="about Nipe Mchongo" className="object-contain bg-center w-full h-full" />
                        <div className="absolute inset-0"></div>
                    </div>
                </div>
            </section>


            <section className="bg-gradient-to-b from-white to-gray-50 py-2 px-6 md:px-16 font-sans" id="how to use">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                        Jinsi ya <span className="text-orange-500">Kutumia</span>
                    </h2>
                    <p className="text-base md:text-md text-gray-600 mb-12 max-w-2xl mx-auto">
                        Fuata hatua hizi rahisi na uanze kupata huduma ndani ya dakika chache.
                    </p>

                    <div className="relative">
                        {/* vertical line */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 h-full border-l-4 border-dashed border-orange-300"></div>

                        <div className="space-y-12">
                            {/* Step 1 */}
                            <div className="flex items-center w-full">
                                <div className="w-1/2 pr-8 text-right">
                                    <h4 className="text-lg font-semibold text-gray-800">1. Jiunge</h4>
                                    <p className="text-gray-600 text-sm mt-2">
                                        Sajili akaunti yako bure kwa kutumia email au namba ya simu.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-100 border-4 border-white shadow-lg z-10">
                                        <FaUserPlus className="text-2xl text-blue-600" />
                                    </div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>

                            {/* Step 2 */}
                            <div className="flex items-center w-full flex-row-reverse">
                                <div className="w-1/2 pl-8 text-left">
                                    <h4 className="text-lg font-semibold text-gray-800">
                                        2. Tafuta Huduma
                                    </h4>
                                    <p className="text-gray-600 text-sm mt-2">
                                        Vinjari huduma zinazopatikana na chagua unayohitaji kwa haraka.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-orange-100 border-4 border-white shadow-lg z-10">
                                        <FaSearch className="text-2xl text-orange-500" />
                                    </div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>

                            {/* Step 3 */}
                            <div className="flex items-center w-full">
                                <div className="w-1/2 pr-8 text-right">
                                    <h4 className="text-lg font-semibold text-gray-800">3. Pata Mchongo</h4>
                                    <p className="text-gray-600 text-sm mt-2">
                                        Wasiliana moja kwa moja na mtoa huduma na fanya kazi bila usumbufu.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-green-100 border-4 border-white shadow-lg z-10">
                                        <FaHandshake className="text-2xl text-green-600" />
                                    </div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>

                            {/* Step 4 */}
                            <div className="flex items-center w-full flex-row-reverse">
                                <div className="w-1/2 pl-8 text-left">
                                    <h4 className="text-lg font-semibold text-gray-800">4. Furahia Matokeo</h4>
                                    <p className="text-gray-600 text-sm mt-2">
                                        Lipa kwa urahisi na acha maoni yako kusaidia wengine.
                                    </p>
                                </div>
                                <div className="relative">
                                    <div className="flex items-center justify-center w-14 h-14 rounded-full bg-yellow-100 border-4 border-white shadow-lg z-10">
                                        <FaRegSmile className="text-2xl text-yellow-500" />
                                    </div>
                                </div>
                                <div className="w-1/2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            {/* Why choosing us */}
            <section className="bg-gradient-to-br from-white via-blue-50 to-blue-100 py-20 px-6 md:px-16 font-sans" id="choosing">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                        Kwa Nini Uchague <span className="text-orange-500">Nipe Mchongo?</span>
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-16 max-w-2xl mx-auto">
                        Tunakuunganisha moja kwa moja na fursa za kazi, biashara na miradi — kwa gharama nafuu, haraka na bila usumbufu.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-4 rounded-[4px] shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
                            <CheckCircle className="w-10 h-10 text-orange-500 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Fursa Zilizothibitishwa</h3>
                            <p className="text-sm text-gray-600">
                                Kila mchongo unachapishwa baada ya kuthibitishwa ili kuhakikisha ubora na uhalisia wake.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-[4px] shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
                            <Smartphone className="w-10 h-10 text-orange-500 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Upatikanaji Rahisi</h3>
                            <p className="text-sm text-gray-600">
                                Pata na tumia fursa kupitia simu au kompyuta — popote ulipo, muda wowote.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-[4px] shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
                            <Users className="w-10 h-10 text-orange-500 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Kukuza Mitandao</h3>
                            <p className="text-sm text-gray-600">
                                Kuunganishwa na waajiri, watoa huduma na wabia wapya kwa ajili ya miradi mbalimbali.
                            </p>
                        </div>

                        <div className="bg-white p-4 rounded-[4px] shadow-sm hover:shadow-xl transition transform hover:-translate-y-1">
                            <ThumbsUp className="w-10 h-10 text-orange-500 mb-4" />
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Huduma Zenye Matokeo</h3>
                            <p className="text-sm text-gray-600">
                                Wengi wamepata kazi na mikataba kupitia Nipe Mchongo na kuthibitisha ubora wake.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonial */}
            <link href="https://unpkg.com/aos@2.3.4/dist/aos.css" rel="stylesheet" />

            <section className="bg-white py-20 px-6 md:px-16 font-sans" id="testimonial">
                <div className="max-w-6xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-blue-900 mb-2">
                        Waliotumia <span className="text-orange-500">Nipe Mchongo</span> Wanasema
                    </h2>
                    <p className="text-base md:text-md text-gray-600 mb-6 max-w-2xl mx-auto">
                        Ushuhuda kutoka kwa baadhi ya watumiaji wetu waliopata kazi, mikataba
                        na fursa kupitia Nipe Mchongo.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        {/* Testimonial 1 */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://i.pravatar.cc/100?img=1"
                                    alt="Client 1"
                                    className="w-12 h-12 rounded-full mr-4 border-2 border-orange-500"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">Neema J.</h4>
                                    <span className="text-xs text-gray-500">Arusha</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                <FaQuoteLeft className="inline text-green-600 mr-2" />
                                “Kupitia <span className="font-semibold">Nipe Mchongo</span> nilipata
                                kazi ya event planner haraka na kwa gharama nafuu. Iliniokoa sana.”
                            </p>
                            <div className="flex text-yellow-400 text-sm">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt />
                            </div>
                        </div>

                        {/* Testimonial 2 */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://i.pravatar.cc/100?img=11"
                                    alt="Client 2"
                                    className="w-12 h-12 rounded-full mr-4 border-2 border-orange-500"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">Musa K.</h4>
                                    <span className="text-xs text-gray-500">Dodoma</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                <FaQuoteLeft className="inline text-green-600 mr-2" />
                                “Nilihitaji fundi wa IT kwa ofisi yangu. <span className="font-semibold">Nipe Mchongo</span>
                                ilinisaidia kumpata ndani ya siku moja tu.”
                            </p>
                            <div className="flex text-yellow-400 text-sm">
                                <FaStar /><FaStar /><FaStar /><FaStar /><FaRegStar />
                            </div>
                        </div>

                        {/* Testimonial 3 */}
                        <div className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1 duration-300">
                            <div className="flex items-center mb-4">
                                <img
                                    src="https://i.pravatar.cc/100?img=6"
                                    alt="Client 3"
                                    className="w-12 h-12 rounded-full mr-4 border-2 border-orange-500"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold text-gray-800">Zainabu M.</h4>
                                    <span className="text-xs text-gray-500">Dar es Salaam</span>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                                <FaQuoteLeft className="inline text-green-600 mr-2" />
                                “Kwa mchongo wa haraka wa social media manager, <span className="font-semibold">Nipe Mchongo</span>
                                ilinipa mtaalamu mzuri na kazi ilifanyika vizuri sana.”
                            </p>
                            <div className="flex text-yellow-400 text-sm">
                                <FaStar /><FaStar /><FaStar /><FaStarHalfAlt /><FaRegStar />
                            </div>
                        </div>
                    </div>
                </div>
            </section>




            {/* Footer */}
            <footer className="bg-gradient-to-br from-blue-900 via-blue-700 to-blue-900 text-white py-10" id="footer">
                <div className="max-w-7xl mx-[1%] px-4 grid grid-cols-1 md:grid-cols-4 gap-">

                    <div>
                        <div className="flex items-center gap-2">
                            <h2 className="text-xl font-bold text-orange-500">Nipe Mchongo</h2>
                        </div>
                        <p className="mt-4 text-sm leading-relaxed">
                            Tunawawezesha wataalamu wa media kuunganishwa, kushirikiana na kukuza taaluma kupitia jukwaa moja la
                            kisasa.
                        </p>
                        <div className="flex mt-4 space-x-4 text-green-800 text-xl">
                            <a href="#"><i className="fab fa-instagram hover:text-gray-300"></i></a>
                            <a href="#"><i className="fab fa-linkedin hover:text-gray-300"></i></a>
                            <a href="#"><i className="fab fa-x-twitter hover:text-gray-300"></i></a>
                            <a href="#"><i className="fab fa-facebook hover:text-gray-300"></i></a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3 text-orange-500">Link za Haraka</h3>
                        <ul className="space-y-2 text-sm mb-3">
                            <li><a href="#" className="hover:underline">Kuhusu Nipe Mchongo</a></li>
                            <li><a href="#" className="hover:underline">Jinsi Inavyofanya Kazi</a></li>
                            <li><a href="#" className="hover:underline">Maoni ya Watumiaji</a></li>
                            <li><a href="#" className="hover:underline">Maswali Yaulizwayo</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3 text-orange-500">Habari</h3>
                        <ul className="space-y-2 text-sm mb-3">
                            <li><a href="#" className="hover:underline">Sera ya Faragha</a></li>
                            <li><a href="#" className="hover:underline">Masharti ya Matumizi</a></li>
                            <li><a href="#" className="hover:underline">Taarifa kwa Vyombo vya Habari</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-3 text-orange-500">Mawasiliano</h3>
                        <ul className="space-y-3 text-sm mb-3">
                            <li className="flex items-start gap-2">
                                <i className="fas fa-map-marker-alt mt-1"></i>
                                <span>Kilimanjaro, Tanzania</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-envelope"></i>
                                <a href="mailto:support@Nipe Mchongo.co.tz">support@nipemchongo.com</a>
                            </li>
                            <li className="flex items-center gap-2">
                                <i className="fas fa-phone-alt"></i>
                                <a href="tel:+255712345678">+255 622 518 685</a>
                            </li>
                        </ul>
                    </div>

                </div>

                <div className="mt-8 border-t border-orange-500 text-white pt-4 text-center text-sm">
                    &copy; Nipe Mchongo 2025.
                </div>
            </footer>
        </div>
    );
}
