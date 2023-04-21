import styles from "./all-contracts.module.scss";
import { useState, useRef, useEffect } from "react";
import Contract from "./contract/contract";
const contract = {
  title: "Contract Title",
  contents: [
    {
      title: "Contract 1",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus minima ipsam exercitationem labore, at ullam alias mollitia repudiandae, nulla fuga totam dolorem autem? Ullam ipsum cum maxime nisi nobis id dicta optio fuga accusamus explicabo sit aliquid saepe molestiae odit doloremque veniam in quisquam similique praesentium aut vero, quaerat dolore ut! Esse illo id neque eum ullam obcaecati, qui magnam atque aliquid nulla pariatur blanditiis quos autem ratione culpa! Repellendus animi, consectetur, eaque voluptas perspiciatis id voluptatem nulla earum fugiat quibusdam debitis tempore ad cupiditate non, eveniet rem nobis suscipit vel. Nemo et libero iusto fugiat commodi qui alias.",
    },
    {
      title: "Contract 2",
      text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus minima ipsam exercitationem labore, at ullam alias mollitia repudiandae, nulla fuga totam dolorem autem? Ullam ipsum cum maxime nisi nobis id dicta optio fuga accusamus explicabo sit aliquid saepe molestiae odit doloremque veniam in quisquam similique praesentium aut vero, quaerat dolore ut! Esse illo id neque eum ullam obcaecati, qui magnam atque aliquid nulla pariatur blanditiis quos autem ratione culpa! Repellendus animi, consectetur, eaque voluptas perspiciatis id voluptatem nulla earum fugiat quibusdam debitis tempore ad cupiditate non, eveniet rem nobis suscipit vel. Nemo et libero iusto fugiat commodi qui alias.",
    },
    {
      title: "Contract 3",
      content:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis doloribus minima ipsam exercitationem labore, at ullam alias mollitia repudiandae, nulla fuga totam dolorem autem? Ullam ipsum cum maxime nisi nobis id dicta optio fuga accusamus explicabo sit aliquid saepe molestiae odit doloremque veniam in quisquam similique praesentium aut vero, quaerat dolore ut! Esse illo id neque eum ullam obcaecati, qui magnam atque aliquid nulla pariatur blanditiis quos autem ratione culpa! Repellendus animi, consectetur, eaque voluptas perspiciatis id voluptatem nulla earum fugiat quibusdam debitis tempore ad cupiditate non, eveniet rem nobis suscipit vel. Nemo et libero iusto fugiat commodi qui alias.",
    },
  ],
};

function AllContractsPage() {
  const [showMore, setShowMore] = useState(false);
  const docRef = useRef(null);
  console.log({ showMore });
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (docRef.current && !docRef.current.contains(event.target)) {
        setShowMore(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [docRef]);

  return (
    <div className={styles.allEmployees}>
      <h1 className="__pageHeading">All Contracts</h1>
      <div className="__tableContainer">
        <table>
          {/* <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>
                Employee Name <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Employee Email <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Employee Phone <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Generated <img src="/sorting.png" alt="sort" />
              </th>
              <th>
                Total Contracts Signed <img src="/sorting.png" alt="sort" />
              </th>
            </tr>
          </thead> */}
          <tbody>
            {Array(25)
              .fill()
              .map((_, i) => (
                <Contract contract={contract} />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllContractsPage;
