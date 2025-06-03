// components/GitHubStats.tsx
const GitHubStats = () => {
    const username = "abhiamishra"; // change this
  
    return (
      <div className="flex flex-row items-center gap-4">
        <img
          src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=dark`}
          alt="GitHub Stats"
          width={400}
        />
        {/* <img
          src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=dark`}
          alt="Top Languages"
          width={500}
        /> */}
      </div>
    );
  };
  
export default GitHubStats;
  