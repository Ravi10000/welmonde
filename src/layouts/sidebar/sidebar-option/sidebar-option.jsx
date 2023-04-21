import styles from "./sidebar-option.module.scss";

function SidebarOption({ selected, icon, name, ...props }) {
  return (
    <div
      className={`${styles.optionItem} ${selected && styles.selected}`}
      {...props}
    >
      <img src={icon} />
      {/* <p className={styles.name}>{name}</p> */}
    </div>
  );
}

export default SidebarOption;
