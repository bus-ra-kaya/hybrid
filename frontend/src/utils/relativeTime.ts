export function getRelativeDate(date: Date){
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000 );

    if(diffInSeconds < 60) return 'Just now';

    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) {
    return diffInMinutes === 1 ? 'a minute ago' : `${diffInMinutes} minutes ago`;
  }

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) {
    return diffInHours === 1 ? 'an hour ago' : `${diffInHours} hours ago`;
  }

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) {
    return diffInDays === 1 ? 'yesterday' : `${diffInDays} days ago`;
  }

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) {
    return diffInWeeks === 1 ? 'a week ago' : `${diffInWeeks} weeks ago`;
  }

    const diffInMonths = Math.floor(diffInWeeks / 4);
    if (diffInMonths < 12) {
    return diffInMonths === 1 ? 'a month ago' : `${diffInMonths} months ago`;
  }

    const diffInYears = Math.floor(diffInMonths / 12);
    return diffInYears === 1 ? 'a year ago' : `${diffInYears} years ago`;
}