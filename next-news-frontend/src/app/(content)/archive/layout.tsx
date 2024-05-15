const ArchiveLayout = ({ archive, latest }) => {
  return (
    <div>
      <h1>News Archive</h1>
      <section id="archive-header">{archive}</section>
      <h1>News Latest</h1>
      <section id="archive-header">{latest}</section>
    </div>
  );
};

export default ArchiveLayout;
