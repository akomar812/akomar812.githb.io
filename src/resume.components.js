function Experience(props) {
  return (
    <div className="experience">
      <div className="experience-header">
        <span className="experience-title">{props.title}</span>
        <span>@</span>
        <span className="experience-name">{props.name}</span>
        <span> in </span>
        <span className="experience-location">{props.location}</span>
        <span> from </span>
        <span className="experience-dates">{props.dates[0]}-{props.dates[1]}</span>
      </div>
      <div>
        Role and accomplishments
      </div>
    </div>
  );
}

export { Experience };
