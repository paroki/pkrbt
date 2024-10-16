import type { MarriagesProps } from './api';

interface GroupedItems {
  first: MarriagesProps[];
  second: MarriagesProps[];
  third: MarriagesProps[];
}

export function groupByWeeks(items: MarriagesProps[]): GroupedItems {
  const now = new Date();
  const startOfWeek = new Date(now);

  // Set to the start of the current week (Sunday at 00:00:00)
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const weekInMillis = 7 * 24 * 60 * 60 * 1000; // Number of milliseconds in a week

  // Object to hold grouped items
  const groupedItems: GroupedItems = {
    first: [],
    second: [],
    third: []
  };

  items.forEach((item) => {
    const itemDate = new Date(item.startAt); // Convert startAt to a Date object
    const diffInMillis = itemDate.getTime() - startOfWeek.getTime();
    const weekDiff = Math.floor(diffInMillis / weekInMillis);

    // Group items based on the number of weeks from the current week
    if (weekDiff >= 0 && weekDiff < 2) {
      groupedItems.first.push(item);
    } else if (weekDiff === 2) {
      groupedItems.second.push(item);
    } else if (weekDiff === 3) {
      groupedItems.third.push(item);
    }
    // Items beyond 4 weeks are not included
  });

  return groupedItems;
}
