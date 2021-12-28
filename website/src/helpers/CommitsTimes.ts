export const convertDataCommitsToYearly = (commits: any) => {
  let commitsByYear: any = [];
  commits.map((d: any) => {
    let year = d.date.slice(0, 4);
    if (commitsByYear.some((e: any) => e.timeScale === year)) {
      commitsByYear.map((f: any) => {
        if (f.timeScale === year) {
          f.data.push(d);
        }
      });
    } else {
      commitsByYear.push({ timeScale: year, data: [] });
    }
  });
  let yearlyOrderedCommits = commitsByYear.sort(function (a: any, b: any) {
    return (new Date(a.timeScale) as any) - (new Date(b.timeScale) as any);
  });
  return yearlyOrderedCommits;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const convertYearlyDataToMonthly = (commits: any) => {
  console.log("Commits", commits);

  let monthlyCommits: any = months.map((d) => {
    return {
      timeScale: d,
      data: [],
    };
  });
  commits.map((d: any) => {
    const date = new Date(d.date);
    let month = months[date.getUTCMonth()];
    monthlyCommits.map((f: any) => {
      if (f.timeScale === month) {
        f.data.push(d);
      }
    });
  });
  return monthlyCommits;
};
