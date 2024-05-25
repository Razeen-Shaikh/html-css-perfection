import { useEffect, useState } from "react";
import "./members.css";
import data from "../data/data";

function Members() {
  const [members, setMembers] = useState(data);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    let initial_data = members.slice(0, 50);
    setMembers(initial_data);
    let temp = [];
    for (let i = 1; i <= Math.ceil(data.length / 50); i++) {
      temp.push(i);
    }
    setPages(temp);
  }, []);

  const goToFirstPage = () => {
    setPage(1);
  };

  const goToLastPage = () => {
    setPage(pages.length);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < pages.length) {
      setPage(currentPage + 1);
    }
  };

  const setPage = (page) => {
    let initial_data = data.slice((page - 1) * 50, page * 50);
    setMembers(initial_data);
    setCurrentPage(page);
  };

  const selectAll = () => {
    const checkboxes = document.querySelectorAll(
      "input[type='checkbox'][name='members']"
    );
    for (let i = 0; i < checkboxes.length; i++) {
      checkboxes[i].checked = true;
    }
  };

  return (
    <>
      <div className="heading">
        <h1>회원상세</h1>
        <span className="symbol"></span>
        <div className="required">필수항목</div>
      </div>
      <div className="line"></div>
      <ul className="titles">
        <li className="title">기본정보 관리</li>
        <li className="title">투자유형 관리</li>
        <li className="title">입출금내역 조회</li>
        <li className="title">영업내역 조회</li>
        <li className="title">투자내역 조회</li>
        <li className="title">채권내역 조회</li>
        <li className="title">SMS 관리</li>
        <li className="title">상담내역 관리</li>
        <li className="title">1:1문의내역 조회</li>
      </ul>
      <div className="application-list">
        <h2>
          신청 목록{" "}
          <span>
            (총 100명 | 승인대기 <u>1</u>건)
          </span>
        </h2>
        <div className="filter">
          <select defaultValue="승인여부 전체">
            <option value="승인여부 전체">승인여부 전체</option>
            <option value="승인대기">승인대기</option>
            <option value="승인완료">승인완료</option>
            <option value="승인거부">승인거부</option>
          </select>
          <select defaultValue="신청일시순">
            <option value="신청일시순">신청일시순</option>
            <option value="승인일시순">승인일시순</option>
          </select>
          <select defaultValue="50개씩 보기">
            <option value="50개씩 보기">50개씩 보기</option>
            <option value="100개씩 보기">100개씩 보기</option>
          </select>
        </div>
      </div>
      <div className="line"></div>
      <div className="actions">
        <button className="btn">등록</button>
        <div className="action">
          <span>선택한 0건</span>
          <select defaultValue="승인상태 변경">
            <option value="승인상태 변경" hidden={true}>
              승인상태 변경
            </option>
            <option value="승인완료">승인완료</option>
            <option value="승인거부">승인거부</option>
          </select>
          <button className="btn">저장</button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={selectAll} />
            </th>
            <th>NO</th>
            <th>기존유형</th>
            <th>신청유형</th>
            <th>제출서류</th>
            <th>신청일시</th>
            <th>승인여부</th>
            <th>승인거부 사유</th>
            <th>승인일시</th>
            <th>관리자</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.NO}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{member.NO}</td>
              <td>{member.기존유형}</td>
              <td>{member.신청유형}</td>
              <td>
                <button className="btn-grey">{member.제출서류}</button>
              </td>
              <td>{member.신청일시}</td>
              <td>
                <span
                  className={
                    "status " +
                    (member.승인여부 === "승인대기"
                      ? "pending"
                      : member.승인여부 === "승인거부"
                      ? "failure"
                      : "success")
                  }
                >
                  {member.승인여부}
                </span>
              </td>
              <td>{member["승인거부 사유"]}</td>
              <td>{member.승인일시}</td>
              <td>{member.관리자}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <div className="page-count">
          {" "}
          <button className="btn-pagination" onClick={goToFirstPage}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button className="btn-pagination" onClick={goToPreviousPage}>
            <i className="fa-solid fa-angle-left"></i>
          </button>
          {pages.map((page) => (
            <button
              key={page}
              className={"btn-page " + (page === currentPage ? "active" : "")}
              onClick={() => setPage(page)}
            >
              {page}
            </button>
          ))}
          <button className="btn-pagination" onClick={goToNextPage}>
            <i className="fa-solid fa-angle-right"></i>
          </button>
          <button className="btn-pagination" onClick={goToLastPage}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Members;
