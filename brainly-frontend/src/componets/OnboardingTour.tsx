import { useEffect, useState } from 'react';
import { driver } from 'driver.js';
import 'driver.js/dist/driver.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip } from 'antd';
export function OnboardingTour() {
    const [hasSeenTour, setHasSeenTour] = useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user has seen the tour before
        const tourSeen = localStorage.getItem('secondBrain_tourComplete');

        if (tourSeen) {
            setHasSeenTour(true);
            return;
        }

        // Only start the tour on the dashboard page after login
        if (location.pathname === '/dashboard') {
            // Wait for elements to be rendered
            setTimeout(() => {
                startTour();
            }, 1000);
        }
    }, [location.pathname]);

    const startTour = () => {
        const driverObj = driver({
            showProgress: true,
            smoothScroll: true,
            animate: true,
            stagePadding: 1,
          
           
           // Darker overlay
            
            popoverClass: 'custom-driver-popover',
            doneBtnText: 'Finish',
            nextBtnText: 'Next',
            prevBtnText: 'Back',
            steps: [
                {
                    element: '#app-logo',
                    popover: {
                        title: 'Welcome to Second Brain',
                        description: 'Your personal knowledge management tool. Let\'s take a quick tour!',
                        side: 'bottom',
                        align: 'center',
                    }
                },
                {
                    element: '.sidebar-home',
                    popover: {
                        title: 'Home Dashboard',
                        description: 'View all your saved content in one place',
                        side: 'right',
                    }
                },
                {
                    element: '.sidebar-youtube',
                    popover: {
                        title: 'YouTube Content',
                        description: 'Save and organize your favorite YouTube videos',
                        side: 'right',
                    }
                },
                {
                    element: '.sidebar-twitter',
                    popover: {
                        title: 'Twitter Content',
                        description: 'Save interesting tweets for later reference',
                        side: 'right',
                    }
                },
                {
                    element: '.sidebar-links',
                    popover: {
                        title: 'Links',
                        description: 'Bookmark and categorize important web links',
                        side: 'right',
                    }
                },
                {
                    element: '.create-content-button',
                    popover: {
                        title: 'Add New Content',
                        description: 'Click here to add new videos, tweets, or links to your second brain',
                        side: 'left',
                    }
                },
                {
                    element: '.share-button',
                    popover: {
                        title: 'Share Your Content',
                        description: 'Generate a link to share selected content with others',
                        side: 'bottom',
                    }
                },
                {
                    popover: {
                        title: 'You\'re all set!',
                        description: 'Start adding content to build your second brain. Happy organizing!',
                    }
                }
            ],
            onDestroyed: () => {
                localStorage.setItem('secondBrain_tourComplete', 'true');
                setHasSeenTour(true);
            },
        });
        driverObj.drive();
    };

    return (
        <>
       
        <Tooltip
            title={`Get Second Brain Tour`}
            trigger={"hover"}
            color="geekblue"
            arrow
        >
            <div className="fixed bottom-4 right-4 z-50">
                {hasSeenTour && (
                    <button
                        onClick={startTour}
                        className="bg-red-600 hover:bg-blue-700 text-white rounded-full p-1 shadow-lg"
                        aria-label="Show tour guide"
                    >
               <img src="/tour.svg" alt="touricon" className='w-7 md:w-8 lg:w-11 xl:w-10'/>
                    </button>
                )}
            </div>
        </Tooltip>

         </>
    );
}