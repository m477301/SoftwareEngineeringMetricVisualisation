function UserCard({ ...props }) {
  return (
    <div className="UserCard first">
      <img src={props.avatar_url} alt={props.name} />
      <div className="userDetails">
        <div className="Title">{props.name}</div>
        <a href={props.html_url} target="_blank">
          <div className="subTitle">{props.login}</div>
        </a>
        <div className="Bio">{props.bio}</div>
      </div>
    </div>
  );
}

export default UserCard;
