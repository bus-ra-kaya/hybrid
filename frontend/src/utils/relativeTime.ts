export function getRelativeDate(date: Date){
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000 );

    if(diffInSeconds < 60) return 'Just now';

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes}minutes ago`;


    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 60) return `${diffInHours}hours ago`;


    const diffInDays = Math.floor(diffInHours / 60);
    if (diffInDays < 60) return `${diffInDays}days ago`;


    const diffInWeeks = Math.floor(diffInDays / 60);
    if (diffInWeeks < 60) return `${diffInWeeks}weeks ago`;


    const diffInMonths = Math.floor(diffInWeeks / 60);
    if (diffInMonths < 60) return `${diffInMonths}months ago`;


    const diffInYears = Math.floor(diffInMonths / 60);
    return `${diffInYears}years ago`;
}