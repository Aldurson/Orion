import career from "!!raw-loader!../res/career_syn.txt";
import {
  Container,
  Navbar,
  Table,
  Nav,
  Image,
  ProgressBar,
  Accordion,
} from "react-bootstrap";

import img1 from "../img/croppedsam.png";
import img2 from "../img/tshepo.jpg";
import { Map } from "./Map.js";
import { Sidebar } from "./Sidebar.js";
import { CustomModal } from "./CustomModal.js";
import {
  readBooks,
  shortCourses,
  navTitles,
  COORDS,
  experiences,
  dataStations,
  CCTV,
  getCoords,
} from "../config.js";
import { useEffect, useState } from "react";

export const CustomNavBar = () => {
  function createTitles(title, i) {
    return (
      <Nav.Link href="#foot" key={i}>
        {title}
      </Nav.Link>
    );
  }
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      sticky="top"
      expand="md"
      className="content-panel p-3"
    >
      <Container>
        <Navbar.Brand href="#">Ntlaletseng Samuel Nyamah</Navbar.Brand>
        <Navbar.Toggle aria-controls="custom-navbar-nav" />
        <Navbar.Collapse id="custom-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#about">About</Nav.Link>
            <Nav.Link href="#head">Home</Nav.Link>
            <Nav.Link href="#skills">Skills</Nav.Link>
            <Nav.Link href="#achievements">Achieve</Nav.Link>
            <Nav.Link href="#projects">Proj</Nav.Link>
            <Nav.Link href="#experience">Exper</Nav.Link>
            <Nav.Link href="#education">Educa</Nav.Link>
            <Nav.Link href="#passion">Passions</Nav.Link>
            <Nav.Link href="#reference">Ref</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export const CustomHeader = () => {
  return (
    <div id="head" className="content-panel shadow-lg mb-5 bg-white">
      <table>
        <tbody className="align-middle">
          <tr>
            <td>
              <div>
                <Image
                  src={img1}
                  rounded
                  roundedCircle
                  style={{ width: "200px", marginRight: "60px" }}
                />
              </div>
            </td>
            <td>
              <h1>Ntlaletseng Samuel Nyamah</h1>
              <h3>Engineer, Manager, Front-End Developer</h3>
              <h6>Professional Engineer (Pr. Eng.) : Number - 20190991</h6>
              <table style={{ marginTop: "20px" }}>
                <tbody>
                  <tr>
                    <td>Cell:</td>
                    <td>+27 82 237 1504</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>snyamah@gmail.com</td>
                  </tr>
                  <tr>
                    <td>Location:</td>
                    <td>1852 Kamogoro Street, Kagiso 2, Gauteng, 1754</td>
                  </tr>
                  <tr>
                    <td>Drivers License:</td>
                    <td>Code B</td>
                  </tr>
                  <tr>
                    <td>Languages:</td>
                    <td>
                      English, Pedi, Zulu,{" "}
                      <p style={{ display: "inline", fontSize: "6px" }}>
                        Afrikaans
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export const CustomAbout = () => {
  return (
    <div className="content-panel shadow-lg mb-5 bg-white" id="about">
      <h1>About Me</h1>
      <p>{career}</p>
    </div>
  );
};
export const CustomSkills = () => {
  return (
    <div className="content-panel shadow-lg mb-5 bg-white" id="skills">
      <h1>Professional Skills</h1>
      <div className="skills-div">
        <div>
          <h5>Buisness Case Development /</h5>
          <h5>Market,Operational, Buisness Research</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="success"
            now={60}
          />
        </div>
        <div>
          <h5>Tender Document Dev (Supply and response) /</h5>
          <h5>Market Evaluation</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="success"
            now={60}
          />
        </div>
        <div>
          <h5>Technical Document Dev /</h5>
          <h5>Technical Research</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="success"
            now={60}
          />
        </div>
        <div>
          <h5>Knowledge on Local Government legislation &</h5>
          <h5>policies</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="info"
            now={50}
          />
        </div>
        <div>
          <h5>Network Design & Operation /</h5>
          <h5>Vendor Agnostic</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="warning"
            now={50}
          />
        </div>
        <div>
          <h5>Solutions Architect /</h5>
          <h5>Vendor Agnostic</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="warning"
            now={50}
          />
        </div>
        <div>
          <h5>Computer Literacy: MS Office, SAP</h5>
          <ProgressBar
            className="progressbar1"
            striped
            animated
            variant="info"
            now={60}
          />
        </div>
        <div>
          <h5>
            Network Equipment : <span style={{ color: "green" }}>C</span>isco,{" "}
            <span style={{ color: "red" }}>H</span>uawei,{" "}
            <span style={{ color: "orange" }}>A</span>lcatel Lucient
          </h5>
          <ProgressBar className="progressbar1">
            <ProgressBar striped animated variant="success" now={25} />
            <ProgressBar striped animated variant="danger" now={15} />
            <ProgressBar striped animated variant="warning" now={10} />
          </ProgressBar>
        </div>
        <div>
          <h5>
            <span style={{ color: "blue" }}>H</span>TML,{" "}
            <span style={{ color: "red" }}>C</span>SS and{" "}
            <span style={{ color: "green" }}>J</span>avascript
          </h5>
          <ProgressBar className="progressbar1">
            <ProgressBar striped animated variant="info" now={30} />
            <ProgressBar striped animated variant="danger" now={25} />
            <ProgressBar striped animated variant="success" now={20} />
          </ProgressBar>
        </div>
        <div>
          <h5>
            Libraries : <span style={{ color: "green" }}>B</span>ulma,{" "}
            <span style={{ color: "green" }}>B</span>ootstrap,{" "}
            <span style={{ color: "red" }}>R</span>eact,{" "}
            <span style={{ color: "orange" }}>L</span>eaflet,{" "}
            <span style={{ color: "green" }}>J</span>query
          </h5>
          <ProgressBar className="progressbar1">
            <ProgressBar striped animated variant="success" now={35} />
            <ProgressBar striped animated variant="danger" now={15} />
            <ProgressBar striped animated variant="warning" now={20} />
          </ProgressBar>
        </div>
      </div>
    </div>
  );
};
export const CustomPassions = () => {
  const [active, setActive] = useState(false);
  const [book, setBook] = useState(null);
  const books = readBooks();

  const book_table_headings = [
    "#",
    "Title",
    "Author",
    "Reads",
    "First Read",
    "Recommended by",
  ];

  function headings(item, i) {
    return <th key={i}>{item}</th>;
  }
  function bodyItems(item, i) {
    return (
      <tr
        key={i}
        onClick={(e) => {
          //alert(item.message);
          setBook(item);
          setActive(true);
        }}
      >
        <td key={0}>{i}</td>
        <td key={1}>{item.title}</td>
        <td key={2}>{item.author}</td>
        <td key={3}>{item.times_read}</td>
        <td key={4}>{item.first_read}</td>
        <td key={5}>{item.recommender}</td>
      </tr>
    );
  }
  return (
    <div id="passion" className="content-panel shadow-lg mb-5 bg-white">
      <div style={{ width: "700px" }}>
        <h1>Passions</h1>

        <ol>
          <li>
            <div>
              <h3>Reading</h3>
              <p>
                Reading is eyes. <i>Click a row for opinion.</i>
              </p>
              <div
                style={{
                  height: "200px",
                  overflowY: "auto",
                }}
              >
                <Table striped hover variant="light">
                  <thead>
                    <tr>
                      {book_table_headings.map((item, i) => headings(item, i))}
                    </tr>
                  </thead>
                  <tbody>{books.map((item, i) => bodyItems(item, i))}</tbody>
                </Table>
              </div>
            </div>
          </li>
          <br />
          <li>
            <div>
              <h3>Typing</h3>
              <p>Typing is creating, </p>
              <p>when the highest form is speaking.</p>
              <p>Let there be light.</p>
            </div>
          </li>
        </ol>
      </div>
      <CustomModal active={active} setActive={setActive} station={book} />
    </div>
  );
};
export const CustomFoot = () => {
  return (
    <div id="foot">
      <h3>Ntlaletseng Samuel Nyamah</h3>
      <h5>© Ntlaletseng Samuel Nyamah's Company. All rights reserved. 2025</h5>
    </div>
  );
};
export const CustomExperience = () => {
  function createExperience(item, i) {
    if (item.exp_no != 1) {
      return (
        <div key={i}>
          <h3>Title : {item.title}</h3>
          <h4>Department : {item.department}</h4>
          <h4>Location : {item.location}</h4>
          <h4>Duration : {item.duration}</h4>
          <br />
          <Accordion defaultActiveKey={0}>
            <Accordion.Item>
              <Accordion.Header>Activities</Accordion.Header>
              <Accordion.Body>
                <ul>
                  {item.experience.map((exp, q) => (
                    <li key={q}>{exp}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <br />
          <Accordion defaultActiveKey={0}>
            <Accordion.Item>
              <Accordion.Header>Key Projects</Accordion.Header>
              <Accordion.Body>
                <ul>
                  {item.projects.map((exp, p) => (
                    <li key={p}>{exp}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    }
    return (
      <div key={i}>
        <h3>Title : {item.title}</h3>
        <h4>Department : {item.department}</h4>
        <h4>Location : {item.location}</h4>
        <h4>Duration : {item.duration}</h4>
        <br />
        <Accordion defaultActiveKey={0}>
          <Accordion.Item>
            <Accordion.Header>Activities</Accordion.Header>
            <Accordion.Body>
              <ul>
                {item.experience.map((exp, q) => (
                  <li key={q}>{exp}</li>
                ))}
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    );
  }
  return (
    <div id="experience" className="content-panel shadow-lg mb-5 bg-white">
      <h1>Employment Profile</h1>

      <div className="skills-div">
        {experiences.map((item, i) => createExperience(item, i))}
      </div>
    </div>
  );
};
export const CustomEducation = () => {
  const shortCourcess = shortCourses;

  function createShortCources(item, i) {
    return (
      <li
        key={i}
        onClick={(e) => {
          alert(item.reason);
        }}
      >
        <div>
          <h5>{item.name}</h5>
          <h6>Year : {item.year}</h6>
        </div>
      </li>
    );
  }
  return (
    <div
      className="content-panel shadow-lg mb-5 bg-white"
      style={{ justifyContent: "center" }}
      id="education"
    >
      <div style={{ width: "700px" }}>
        {" "}
        <h1>Education</h1>
        <br />
        <h2>Formal:</h2>
        <div>
          <h4>
            1. Bachelor of Engineering (Electronic Engineering){" "}
            <i>from University of Pretoria</i>
          </h4>
          <h5>2007 - 2013</h5>
        </div>
        <br />
        <div>
          <h4>
            2. Bachelor of Engineering Honours (Electronic Engineering){" "}
            <i>from University of Pretoria</i>
          </h4>
          <h5>2018 stopped second semester</h5>
          <p style={{ width: "400px" }}>
            <i>
              Completed only the "Networks" module, it helped with network
              design at work, it supplemented the specialized network skills
              training i would have to look up and start (Huawei, Cisco,
              associate and professional, then python and java and ethical
              hacking, all in preparation for new technologies about to be
              advertised, tender documents submitted, namely Digital Migration
              and networks upgrade and refresh, introduction of IP in the WAN,
              wifi and taking over WLAN environments in operations and corporate
              side of the company). I say all that to say, the 1 networks module
              was not a waste.
            </i>
          </p>
        </div>
        <br />
        <div>
          <Accordion defaultActiveKey={0} style={{ width: "500px" }}>
            <Accordion.Item>
              <Accordion.Header>
                Skills Training{" "}
                <span style={{ fontSize: "8px" }}>-click for opinion</span>
              </Accordion.Header>
              <Accordion.Body>
                <ol>
                  {shortCourcess.map((item, i) => createShortCources(item, i))}
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </div>
    </div>
  );
};
export const CustomRef = () => {
  return (
    <div className="content-panel shadow-lg mb-5 bg-white" id="reference">
      <h1>References</h1>
      <br />

      <div className="skills-div">
        <div>
          <table>
            <tbody>
              <tr>
                <td>Relation:</td>
                <td>First Executive in Career: 2013 - 2018</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>Andrew Matseke</td>
              </tr>
              <tr>
                <td>C. Role:</td>
                <td>Independent</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>+27 83 363 7918</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>matseke@polka.co.za</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <table style={{ columnGap: 3 }}>
            <tbody>
              <tr>
                <td>Relation:</td>
                <td>Last Executive in Career: 2019 - 2022</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>Tshepo Maloma</td>
              </tr>
              <tr>
                <td>C.Role:</td>
                <td>COO at Inq</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>+27 83 794 4829</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>Unknown</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div>
          <br />
          <table>
            <tbody>
              <tr>
                <td>Relation:</td>
                <td>Only Manager in Career: 2015 - 2020</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>Mlindi Mashologu</td>
              </tr>
              <tr>
                <td>C. Role:</td>
                <td>Deputy Director General: ICT Information Society</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>+27 60 588 5844</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>mlindi01@gmail.com</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="recommend-panel">
          <Image src={img2} style={{ width: "10%", border: "none" }} />
          <div>
            <p>Sam is a solid, experienced networking committed</p>
            <p>engineer with a good work ethic, a self starter, </p>
            <p>and focussed on delivering outcomes. : Tshepo Maloma</p>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
};
export const CustomCareer = () => {
  return (
    <div className="content-panel shadow-lg mb-5 bg-white" id="achievements">
      <h1>Career Achievements & Failures</h1>
      <div className="skills-div">
        <div>
          <h3>Career Achievements</h3>
          <div>
            <ol>
              <li>
                Composed, trained and lead a team for the design of Transnet
                national IP network for operations and corporate communications
              </li>
              <li>
                Responsible for the preparation of security systems deployment
                at 33 locations nationally, only 4 of which were approved for
                installation as pilot. Personally conducted:
              </li>
              <br />
              <Accordion defaultActiveKey={0}>
                <Accordion.Item>
                  <Accordion.Header>Activities</Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        Did research of technologies to be deployed (Network
                        elements, CCTV elements, UPS's) and evaluated their
                        integration to a legacy network.
                      </li>
                      <li>
                        Conducted physical surveys and generated Bill of
                        Quantity documents for tender advertisement
                      </li>
                      <li>
                        Created maintenance documentation, trained engineers on
                        maintenance and conducted maintenance personally when no
                        staff.
                      </li>
                      <li>
                        Generated Tender documentation (RFP and technical
                        evaluation documents) and did tender evaluation.
                      </li>
                      <li>
                        Assimilated training material for submission to Transnet
                        training centre
                      </li>
                      <li>
                        Intervened to request security escorts for maintenance
                        teams when getting threatened on site while conducting
                        maintenance.
                      </li>
                      <li>
                        35% of available budget saved on project execution to be
                        used in support of maintenance or other functions.
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
              <br />
              <li>
                Institued training sessions, lead training, personally taught
                and mentored and guided engineers and technicians.
                <ul>
                  <li>
                    3 Engineers got certified Network Specialization (Huawei,
                    Cisco).
                  </li>
                  <li>
                    8 Engineers went from fresh graduates to dependable network
                    specialists.
                  </li>
                  <li>
                    3 Technicians got their Electrical Engineering BTechs. -
                    personally wrote C code.
                  </li>
                  <li>
                    1 Technician got their Electrical Engineering Diploma. -
                    personally wrote C code.
                  </li>
                </ul>
              </li>
            </ol>
          </div>
        </div>

        <div>
          <div className="ps-4">
            <h3>Career Failures</h3>
            <div>
              <ol>
                <li>
                  No Focus on formal education.{" "}
                  <p>
                    I attended 60% of the specialized training with my team, in
                    support of them, a managerial initiative to build more
                    respect, to help with communication to know what they were
                    learning and how their language would change, but i should
                    have delegated 90% of it, and focused more on management and
                    further formal education.
                  </p>
                </li>
                <br />
                <li>
                  Too many projects, across too many departments without
                  consideration for time and resource management. Working
                  weekends often. Inconsiderate.
                </li>
                <br />
                <Accordion defaultActiveKey={0}>
                  <Accordion.Item>
                    <Accordion.Header>Departments</Accordion.Header>
                    <Accordion.Body>
                      <ul>
                        <li>Transnet Freight Rail (TFR) Telecoms</li>
                        <li>TFR Security</li>
                        <li>TFR depots</li>
                        <li>TFR ICT</li>
                        <li>TFR Design</li>
                        <li>TFR Rail Network (RN) Perway</li>
                        <li>TFR RN Electrical</li>
                        <li>TFR RN Signals</li>
                        <li>Transnet Port Terminals</li>
                        <li>Transnet Group ICT</li>
                      </ul>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>

                <br />
                <li>Settled in a role too soon</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export const CustomProjects = () => {
  const [active, setActive] = useState(false);
  const [station, setStation] = useState({});
  const [center, setCenter] = useState(COORDS);
  const stations = dataStations();

  useEffect(() => {
    const temp = getCoords("marble hall");
  }, []);

  return (
    <div className="content-panel shadow-lg mb-5 bg-white" id="projects">
      <h1>
        Projects <em style={{ color: "red", fontSize: "1rem" }}>beta</em>
      </h1>
      <div className="container-map">
        <Sidebar
          stations={stations}
          setCenter={setCenter}
          setStation={setStation}
        />
        <Map
          stations={stations}
          setStation={setStation}
          setActive={setActive}
          center={center}
        />
        <CustomModal active={active} setActive={setActive} station={station} />
      </div>
    </div>
  );
};
