import Records from'./data.json';
/*function DataFecher(){
    return(
        <div>
            {Records && Records.map( record =>{
                return (
                    <div key={record.id}>
                        <h3>{record.todo}</h3>
                        <h3>{record.id}</h3>
                        </div>
                )
            })}
        </div>
    )
}*/
const DataFecher=()=>{
    return Records
}


// const getLastWeekCrashes = (data: Todo[]): { date: string; crashes: number }[] => {
//     const today = new Date();
//     const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  
//     const crashesByDate: { [key: string]: number } = {};
  
//     data.forEach((item) => {
//       const date = new Date(item.createdAt);
//       if (date >= lastWeek) {
//         const dateString = date.toISOString().slice(0, 10);
//         crashesByDate[dateString] = (crashesByDate[dateString] || 0) + 1;
//       }
//     });
  
//     const crashes: { date: string; crashes: number }[] = Object.entries(crashesByDate).map(([date, crashes]) => ({ date, crashes }));
//     return crashes;};
export default DataFecher