import './mock-item.scss';

export function MockItem(children: any) {
  return (
    <div className="card mock">
      <span>{children.xxx}</span>
      <span>{children.data.name}</span>
    </div>
  );
}

export default MockItem;
