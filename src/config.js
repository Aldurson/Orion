"use strict";
import booksRaw from "!!raw-loader!./res/books.txt";
import experience from "!!raw-loader!./res/experience.txt";
import { Accordion } from "react-bootstrap";
import img1 from "./img/run.gif";
import gauteng_stats from "./res/crime_gauteng.ods";
import limpopo_stats from "./res/crime_limpopo.ods";
import northwest_stats from "./res/crime_northwest.ods";
import campus from "./img/CCTV.png";
import adm from "./img/ADM.png";
import xlsx from "xlsx";
import L from "leaflet";
import policeImg from "./img/red.jpeg";
import cctvImg from "./img/CCTV.png";
export const URL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
export const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
export const ZOOM = 2;
//should not hard code this key, should change this ? env variable?
export const revGeoApi = "3c9ef7c7a5494283b4ddc09b8465ed57";
export const GeoApi = "a59e74568d464e24be7986d9f12c5e56";
export const COORDS = [-33.92, 18.42];
export const reverseGeocodingUrl = (lat, lng, revGeoApi) =>
  `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lng}&apiKey=${revGeoApi}`;
const geocodingUrl = (name) => {
  const temp1 = name.split(" ");
  const temp2 = temp1.length > 1 ? temp1.join("%20") : temp1;
  const searcher = `https://api.geoapify.com/v1/geocode/search?text=${temp2}%2C%20south%20africa&format=json&apiKey=${GeoApi}
`;
  return searcher;
};

const getCoords = async (name) => {
  const url = geocodingUrl(name);
  let coords;
  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        coords = [0, 0];
        return;
      }
      return resp.json();
    })
    .then((data) => {
      coords = [data.results[0].lat, data.results[0].lon];
    })
    .catch((e) => {
      console.log(`error happened ${e}`);
      coords = COORDS;
    });
  return coords;
};
export const setName = ({ lat, lng }) => {
  const url = reverseGeocodingUrl(lat, lng, revGeoApi);
  let name;
  fetch(url)
    .then((resp) => {
      if (!resp.ok) {
        name = "unknown";
        return;
      }
      return resp.json();
    })
    .then((data) => {
      name = data.features[0].properties.city;
    })
    .catch((e) => {
      console.log("something went wrong with getting location");
      name = "unknown";
    });
  return name;
};
export const readBooks = () => {
  const books = booksRaw.split("\n");
  const booksObjs = [];
  books.forEach((book) => {
    const temp = book.split("/");
    booksObjs.push({
      title: temp[0],
      author: temp[1],
      times_read: temp[2],
      first_read: temp[3],
      recommender: temp[4],
      message: temp[5],
      type: "book",
      title_modal: `Title: ${temp[0]}`,
      body_modal() {
        return (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <img
              style={{ border: "none" }}
              src={img1}
              width="60px"
              height="60px"
            />
            <p>My opinion of book: {temp[5]}</p>
          </div>
        );
      },
      img_modal: img1,
    });
  });
  return booksObjs;
};
//get reverse gps coordinates from names
export const dataStations1 = () => {
  console.log("gets here");
  return ["df"];
};
export const dataStations = () => {
  function freshData(sheetname, file) {
    function createData(item) {
      const datas = item.split(",");
      const dataArr = [datas[1], datas[2], datas[3], datas[4], datas[5]];
      dataObject.crimes.push({ [datas[0]]: dataArr });
    }
    function createDataSum(item) {
      const datas = item.split(",");
      const dataArr = [datas[1], datas[2], datas[3], datas[4], datas[5]];
      dataObject.crimes_summary.push({ [datas[0]]: dataArr });
    }

    let dataObject = {
      crimes: [],
      crimes_summary: [],
      name: "",
      sex_num: 0,
      murder_num: 0,
      steal_num: 0,
      murder_rating: "",
      steal_rating: "",
      sex_rating: "",
      rating: 0,
      acr: [],
      fullnames: [],
      stats: [],
      getIcon() {
        return L.icon({
          iconUrl: policeImg,
          iconSize: [25, 25],
          iconAnchor: [25, 50],
        });
      },
      provinceName: "",
      coords: [0, 0],
      num_of_crimes: 0,
      popup_content() {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "11px",
            }}
          >
            <p>Police Station: {this.name}</p>

            <p>click me</p>
          </div>
        );
      },
      menuItem_content() {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "8px",
            }}
          >
            <p>Town: {this.name}</p>
            <p>Murder Rating : {this.murder_rating}</p>
          </div>
        );
      },
      title_modal() {
        return;
        <h3>
          Police Station ,{this.provinceName}, {this.name}
        </h3>;
      },
      body_modal() {
        return (
          <div>
            <h5 style={{ marginBottom: "3rem" }}>
              Statistics : Province - {this.provinceName}, Town - {this.name}
            </h5>
            <ul>
              <li>Overall crime stat rating : {this.overall_rating}</li>
              <li>Murder Offense rating : {this.murder_rating}</li>
              <li>Sex Offense rating : {this.sex_rating}</li>
              <li>Steal Offense rating : {this.steal_rating}</li>
            </ul>
            <div className="stats-div">
              {this.fullnames.map((item, i) => {
                return (
                  <div>
                    {item} :
                    <ul style={{ listStyleType: "none" }}>
                      <li>{this.stats[i][0]} cases in 2021</li>
                      <li>
                        {this.stats[i][1]}
                        cases in 2022
                      </li>
                      <li>{this.stats[i][2]} cases in 2023</li>
                      <li>{this.stats[i][3]} cases in 2024</li>
                      <li>{this.stats[i][4]} cases in 2025</li>
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        );
      },
    };

    const csvString = xlsx.utils.sheet_to_csv(file.Sheets[sheetname]);
    const temp = csvString.split(",,");

    const temp1 = temp
      .map((item) => {
        if (item === "" || item === "\n" || item === ",\n" || item === ",")
          return "";
        return item;
      })
      .filter((item) => item != "");
    const tempx = temp1.slice(7);

    if (namevalue === "") namevalue = tempx[0];
    tempx.forEach((item, i) => {
      switch (i) {
        case 0:
          dataObject.provinceName = item.replace("\n", "").slice(1);
          break;
        case 1:
          //dataObject.name = item.split("\n")[1];
          const temp = item.split("\n")[1];
          const temp1 = temp.replace("District", "");
          dataObject.name = temp1;
          break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 14:
        case 15:
        case 16:
        case 17:
        case 19:
        case 20:
        case 21:
        case 23:
        case 24:
        case 25:
        case 27:
        case 28:
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 38:
        case 39:
        case 40:
        case 41:
        case 44:
        case 45:
        case 46:
        case 47:
        case 49:
          // i should filter data object for unused data.
          createData(item);
          dataObject.fullnames = dataObject.crimes.map((item) => {
            // Im sure theres a better way of doing this.
            const temp = Object.keys(item);
            return temp[0];
          });
          dataObject.acr = dataObject.fullnames.map((item) => {
            const temp = item.split(" ");
            if (temp.length < 2) return item[0];
            return temp.map((temp1) => temp1[0].toUpperCase()).join("");
          });
          dataObject.stats = dataObject.crimes.map((item) => {
            // Im sure theres a better way of doing this.
            const temp = Object.values(item);
            return temp[0];
          });
          break;
        case 12:
        case 22:
        case 29:
        case 36:
        case 42:
        case 48:
          createDataSum(item);
          break;
      }
    });

    return dataObject;
  }
  async function dataMinePromise(sheetscount, file) {
    return new Promise((resolve, reject) => {});
  }
  let namevalue = "";
  const files = [limpopo_stats, gauteng_stats, northwest_stats];
  let dataObjects_x = [];

  files.forEach((file) => {
    const sheetsArr = [...file.SheetNames]; //names of sheets
    const sheetsNum = sheetsArr.length - 2; //number of sheet names

    let rawDataArr = [];
    for (let count = 0; count < sheetsNum; count++) {
      // returns object to be pushed into array, where other objects from same province go in
      rawDataArr.push(freshData(sheetsArr[count], file));
    }
    dataObjects_x.push(...rawDataArr);
    namevalue = "";
  });
  const sites_length = dataObjects_x.length;

  dataObjects_x.forEach((item) => {
    item.stats.forEach((temp, i) => {
      if (i == 0 || i == 2) {
        const temp1 = temp.reduce((acc, tempx) => acc + +tempx, 0);
        item.murder_num += temp1;
        item.num_of_crimes += temp1;
        return;
      }
      if (i == 1 || i == 7 || i == 8 || i == 9 || i == 10 || i == 31) {
        const temp1 = temp.reduce((acc, tempx) => acc + +tempx, 0);
        item.sex_num += temp1;
        item.num_of_crimes += temp1;
        return;
      }
      if (
        i == 5 ||
        i == 6 ||
        i == 11 ||
        i == 12 ||
        i == 13 ||
        i == 14 ||
        i == 15 ||
        i == 16 ||
        i == 19 ||
        i == 20 ||
        i == 21 ||
        i == 22 ||
        i == 23 ||
        i == 24 ||
        i == 26 ||
        i == 32
      ) {
        const temp1 = temp.reduce((acc, tempx) => acc + +tempx, 0);
        item.steal_num += temp1;
        item.num_of_crimes += temp1;
        return;
      }
      item.num_of_crimes += temp.reduce((acc, tempx) => acc + +tempx, 0);
    });
  });
  console.log(dataObjects_x);

  return dataObjects_x
    .sort((a, b) => b.num_of_crimes - a.num_of_crimes)
    .map((item, i) => {
      item.overall_rating = `${i - 4} out of ${sites_length}`;
      return item;
    })
    .sort((a, b) => b.sex_num - a.sex_num)
    .map((item, i) => {
      item.sex_rating = `${i - 4} out of ${sites_length}`;
      return item;
    })
    .sort((a, b) => b.murder_num - a.murder_num)
    .map((item, i) => {
      item.murder_rating = `${i - 4} out of ${sites_length}`;
      return item;
    })
    .sort((a, b) => b.steal_num - a.steal_num)
    .map((item, i) => {
      item.steal_rating = `${i - 4} out of ${sites_length}`;
      return item;
    });
};
export const experiences = [
  {
    title: "Senior Engineer",
    department: "Systems Integration – Transnet Telecommunications",
    location: "Johannesburg, Gauteng, South Africa",
    duration: "April 2018 – July 2022",
    experience: [
      "Developed a comprehensive technology roadmap and strategy for IP networking in the operational (train movement) side of the business.",
      "Led the revision of Telco technical and operational environments to accommodate evolving technologies, transitioning from SDH to IP networks.",
      "Provided technical support and oversaw process management for all IP networking aspects in the rail operations.",
      "Mentored and guided Engineers and technicians fostering a culture of continuous learning and professional development.",
      "Spearheaded the development of business cases for various technical solutions, including Digital Migration and National IP OT Operations Wide Area Networks.",
      "Conducted extensive research and market evaluations to identify and assess technologies applicable to the business environment.",
      "Managed budgeting for the Systems Integration department, ensuring optimal allocation of resources and adherence to financial guidelines.",
      "Reviewed technical and functional specifications as well as code (HTML, CSS, and JavaScript) for technical solutions supporting business operations.",
      "Acted as the Project Engineering Manager, overseeing the planning, execution, and completion of various projects within the Systems Integration domain.",
      "Designed and reconfigured wide area networks to meet corporate communication needs, optimizing performance and reliability.",
      "Collaborated with cross-functional teams to ensure the successful implementation of network solutions, aligning with organizational objectives and standards.",
      "Ensured compliance with industry regulations and best practices, maintaining high standards of quality, security, and efficiency in all operational activities.",
    ],
    projects: [
      "Design and reconfiguration of wide area networks for Corporate use in Transnet",
      "Design and develop system for monitoring of radio high site channels [HTML]",
      "Design and develop an application for national remote systems status monitoring [Web Development]",
      "Design, composition and planning of CCTV campus networks for Security applications",
    ],
    exp_no: 0,
  },
  {
    title: "Engineer",
    department: "Systems Integration – Transnet Telecommunications",
    location: "Johannesburg, Gauteng, South Africa",
    duration: "April 2015 – March 2018",
    experience: [
      "Develop comprehensive functional and technical documentation to support various service offerings to support rail operations.",
      "Provide technical support to the National Communication Center for seamless operations control.",
      "Design, Administer and maintain CCTV campus networks to ensure optimal performance and security.",
      "Mentor and train young engineers to foster skill development and professional growth.",
      "Assumed leadership of the Systems Integration sub-department, overseeing its operations and strategic direction.",
      "Manage budgeting processes, prepare reports, and undertake general management responsibilities within the Systems Integration sub-department.",
      "Facilitate the implementation of best practices and standard operating procedures to enhance efficiency and effectiveness.",
      "Collaborate with cross-functional teams to identify and address technical challenges and opportunities.",
      "Conduct regular assessments and audits to ensure compliance with industry standards and regulatory requirements.",
      "Drive continuous improvement initiatives to optimize processes, workflows, and resource allocation.",
    ],
    projects: [
      "Design, deploy and project engineer CCTV and campus networks.",
      "Develop technical and procurement documentation to facilitate the use of unmanned aerial vehicles and satellite imaging for operational use.",
      "Design, composition and planning of CCTV campus networks for Security applications",
    ],
    exp_no: 2,
  },
  {
    title: "Acting Principal Engineer",
    department: "Network Engineering - Transnet Telecommunications",
    location: "Johannesburg, Gauteng, South Africa",
    duration: "March 2021 – August 2021",
    experience: [
      "Contribute to the formulation and execution of departmental strategies, policies, and procedures, ensuring adherence across project and operational activities.",
      "Lead the development of technology roadmaps for mission critical IP and Telecommunications networks.",
      "Provide leadership to the engineering team,",
      " overseeing the design, planning, project management, and quality assurance of telecommunication and operational technology networks.",
      "Offer technical leadership in analyzing requirements, preliminary design, prototyping, and project piloting to align with business objectives and project management principles.",
      "Define and implement telecommunications technology and IP network methodologies based on research and organizational strategies.",
      "Design architecture for complex and simple telecommunications and IP networking systems to ensure the efficiency of train operations.",
      "Drive business case development for new IP and telecommunications networks, aligning with rail network and market demand strategies.",
      "Establish and manage governance frameworks for radio, optical, and IP test labs, while overseeing external service providers, solution development",
      "OEM partnerships, and client relations.",
    ],
    exp_no: 1,
  },
];
export const shortCourses = [
  {
    name: "The Complete Javascript Course 2023 from Udemy",
    year: 2022,
    reason:
      "Progress 100% 3 times, will be able to use it to create front ends for legacy systems with proprietary front ends that are no longer supported by original equipment manufacturer as well as automate processes through scripting as well as create my own projects",
  },
  {
    name: "100 Days of Code: The Complete Python Pro Bootcamp from Udemy",
    year: 2022,
    reason:
      "Progress 30%, still doing revisions on javascript, HTML and CSS as well as Bootstrap, React, Leaflet and Bulma. Can't wait to allocate more of my mind to it for back-end development, machine learning and data analytics and story telling for the children through game development, some of these arcarde games look like python could be used to modify them, plus i have a secret currency project in mind for it. In my professional life, the backend possibilities, data analysis and even AI integrations could go a long way",
  },
  {
    name: "Programming Network Applications in Java from Udemy(only 30% no application environment)",
    year: 2020,
    reason:
      "Progress 30%, no environment to apply this knowledge, i still have an appetite for it though, maybe the future will provide something. Its application in my professional life can be facilitated for by learnings in javascript, html, CSS and the frameworks, libraries and tools that support them.",
  },
  {
    name: "Git: Become an Expert in Git & GitHub in 4 Hours from Udemy",
    year: 2022,
    reason:
      "Progress 100% one time, used it for my web dev projects, have not gotten the knack for a need for this, especially when working alone on all my projects, i can remember where i was usually when i leave a project and when i forget i like the exercise of figuring out where i was, it is like a re-learning of your own code, time is not a scarce resource right now but should be comfortable with this for when it is. I need to get comforable in using this tool and use it as second nature, it will help when i teach coding to others instead of writing it for them all the time.",
  },
  {
    name: "The Complete 2023 Web Development Bootcamp from Udemy",
    year: 2021,
    reason:
      "Progress 100% one time, Dr Angela Yu is amazing, i have done 2 of her other courses, this course set the foundation for my knowledge in CSS, HTML and Javascript and Bootstrap, Jquery and API's, it is a power course, i recommend it for all, it is my 2nd greatest love on udemy after the Javascript what by Jonas Schmedtmann. It too can be used for creating platforms for devices that have none or have one that is no longer supported by original equipment manufacturers.",
  },
  {
    name: "HTML5 & CSS3 Complete Course: Build Websites like a Pro from Udemy",
    year: 2023,
    reason:
      "30% progress, content material repetition course, it always teaches different when you hear the same thing said again by a different mind, you might learn something more or something differently",
  },
  {
    name: "React.JS Crash Course: The Complete Course for Beginners from udemy",
    year: 2023,
    reason:
      "progress 35%, content material repetition course from online self study and other courses. this courses leaves out alot said by actual online documentation, but the explanations are simpler and easier to understand, it requires a childs level of understanding. This too is a power resource for frontend development",
  },
  {
    name: "How To Still The Mind Through Meditation",
    year: 2023,
    reason:
      "progress 64%, experimenting. I heard Bill Duke say that meditation saved his life and helped him turn it around in the late 80's/early 90s, i wanted to see what he saw, he seems to be the american actor with the highest moral character or one of, i liked a line he said on an interview on youtube where he talks about aspiring actors who sell sex for fame, he said, 'who are you after you lose yourself for things', or something to that effect, it struck a cord with me",
  },
  {
    name: "Mental Health for coping with stress & anxiety (coronavirus)",
    year: 2023,
    reason:
      "Progress 54%, wanted to see how i handled the coronavirus in comparison to what professionals think i should have handled it,what was i supposed to know 6 years ago. Comparing what i did with what i was supposed to have done, for both professional and personal life as they tended to overlap during the coronavirus era, with work from home dynamics.",
  },
  {
    name: "Cisco CCNP ENCOR 350-401: online attendance from mastergrade",
    year: 2021,
    reason:
      "Progress 60% by the time i left Transnet and lost access, this course helped with network design, network understanding, orientation and technical language development for myself and my team. We taught each other this course as buying this course for my team and expecting them to learn it didnt work. they thought their formal education was more important (they were right), but then their technical understanding and language was bad and it showed in their work, they didnt know what they were doing on the network unless i gave them ABC instructions as i had been doing work on the network alone 5 years before some of them either joined the company or joined my department. all said in respect ofcourse",
  },
  {
    name: "Java 17 Masterclass: Start Coding in 2024 from Udemy",
    year: 2020,
    reason:
      "Progress 100% one time, Applications in work environment: development of desktop tools for the monitoring of network devices, i revised a monitoring application for remote optical time domain reflectometers (OTDR) that i wrote in java in 2014",
  },
  {
    name: "Cisco CCNA 200-301 : online attendance from mastergrade",
    year: 2020,
    reason:
      "Progress 100% one time, this course greater increased the technical acumen of the entire TFR Telecoms department, they spoke better, worked better with more autonomy and had more courage and self belief, some of them got CCNA certified with the knowledge of this course supplemented by exam papers received from Liquid Telecoms and other resources. It was also the beginning of the department falling apart, as they were more empowered and started seeing how much they knew, how much they could do and those who learnt saw how little other people knew and started looking for greener pastures, many left, to overseas even, 2 to be exact went overseas another 2 left then people just started leaving. I did not anticipate the exit of talent.",
  },
  {
    name: "Android Java Masterclass - Become an App Developer from Udemy",
    year: 2020,
    reason:
      "Progress 100% once, I ended up losing interest in app development, from reading articles talking about that wave being over, and friends focusing on formal education and asking me how I'm going to get people to come to my app. I should have ignored the articles and peoples words, the lessons from courses go far beyond the course itself, alot of skills learned in one course can be applied in different unrelated environments from first view. I used the knowledge in this course, to create a dummy (just the frontend) android app to add snapshots of in work presentations for train container monitoring for the TFR RN Design department.",
  },
  {
    name: "[NEW] Spring Boot 3, Spring 6 & Hibernate for Beginners from Udemy",
    year: 2020,
    reason:
      "progress 1%, let me get well versed at javascript, html, css, python, frameworks and tools first before i attend to this stack. Let me get more comfortable with vanilla Java, i would like to master this cause eventually, maybe in 2030, it is my dream to be as well versed in Spring as i am in everything javascript, hope i get there by time I'm 42 years.",
  },
  {
    name: "Huawei Certified Network Associate – Wireless Local Area Network from Huawei",
    year: 2019,
    reason:
      "This course felt very much like CCNA courses, just a chinese interpretation then interpreted back to english to teach everyone else. It also felt very much like a sales pitch as in addition to the talk on standards, product selling was 60% of the course which broke concentration. It supplemented my understanding of how all network control devices work, generically, they all seem to have the same format, much like everything else, it seems one company does the ground work and figures out how to make things work, then the companies that follow do their variation of a copy and paste. The lunches during training break sessions were amazing",
  },
  {
    name: "Huawei Certified ICT Associate Data Center Facility from Huawei",
    year: 2019,
    reason:
      "I enjoyed this course, more product selling but in a functional manner and exciting and simple. The lunches during breaks were standard.",
  },

  {
    name: "Networking, Cloud, SDN, NFV, MPLS & Hot IT Trends Foundation from Udemy",
    year: 2018,
    reason:
      "A comprehensive and simple introduction to network technologies, good for executive meeting discussions, gives an overview understanding while hiding the difficult unnecesary parts for the purpose of talking to Execs.",
  },
  {
    name: "Internet of Things (IoT) Standards and Applications from SAIEE",
    year: 2018,
    reason:
      "This was a great course, i was not mature enough to assimilate what was being taught, but it was an all encompassing and comprehensive course. Would love to take it again, as soon as i have money i will contact SAIEE for myself",
  },
  { name: "Java SE 8 Programming from Torque IT", year: 2018 },
  { name: "Intermediate Python from Torque IT", year: 2018 },
  {
    name: "Certified Ethical Hacker from Torque IT",
    year: 2018,
    reason:
      "Great course. For application in the workplace with respect to the network and systems, it informed me of the tools of hackers, the mindset of hackers, linux distros used (Kali), where tools are downloaded from, it seems like a black market eco-system of freely available malicious software that anyone can download if they know where to look at exists. The hackers look at vulnerabilities left by authors of software who are in a hurry to release a product in order to make money, further outside of this, one person finds a vulnerability termed exploit and shares it freely with everyone else and so the eco-system keeps growing. So ethical hackers, part of their function is to keep a finger on this eco-system, to be a double agent per se. Firewalls and DMZ environments are one thing but there is more. It is an exciting environment, if i had no other environment responsibilities i would put my foot in this one, alas, i have a network and functional software to write, and engineers and technicians to train and maintenance to plan for and create training documentation for, and funds to request and exco meeting to chase and supply chain to talk to and governance and unions, i like what i have though, allows a large playground for the intellectual side of the mind, single mindedness can be a problem sometimes. The best a corporate environment seems to have done is teach people to be careful of the emails they open and not do password sharing, the people are the weakest point of a network and that is the best we can do, the rest is on infrastructure and the final wall is ethical hacking. All that i have said above are things i learnt from this course.",
  },
  {
    name: "Digital Network Architecture Implementation Essentials from Torque IT",
    year: 2018,
    reason:
      "This course was taken to prepare me for the technology upgrades on the network that would later ensue. They unilaterlly got delayed due to lack of funds for another 4 years. This course simplifies network management, introduces complete dependency and management platforms and creates a single point of failure in scenarios of cyber attacks. I dont like where technology is going, the west seems to be dictating our dependency on platforms they introduce and they are well versed at. Someone sitting anywhere in the world can hold a south african network hostage, there is no device autonomy, which has too great a disadvantage, with its greatest advantage being that one can bring a network up quicker. The previous comment was my view while i was employed.",
  },

  {
    name: "Interconnecting Cisco Networking Devices Part 1 (torque IT) from Torque IT",
    year: 2017,
    reason:
      "This was the first official Cisco course i attended outside of the videos that were past to me in the work office. It started my networking career. It was fulfilling. It would start me on a journey i could never have imagined.",
  },
  {
    name: "NEC 3 : Engineering and Construction Contract (ECC3) from The conference Zone",
    year: 2017,
    reason:
      "The best skill resource to me (at the time of attendance) on project management, contract management; if i could i would attend this course once every year. It empowers the project manager and teaches tricks and shows you alternative ways of getting things done, when usually i would beg the contractor or have to know the technical details of the project to know when the project executioner was playing with me and wasting time and have to show him i was smart too and he had to do what i was telling him to do or beg him to do something, this course puts the power back in the hands in he who has the money, whether he has technical knowledge on what the project entails or not, you can punish the project executioner.",
  },

  {
    name: "Alcatel Lucient training attended from Alcatel",
    year: 2017,
    reason:
      "Great course, enabled me to do maintenance at CIty deep and Germiston fuel depot on the CCTV network for security systems that i had installed there. I recommend it, much better material than the Huawei material, very little sales pitching. I dont hate Huawei, i love them thats why i am straight forward, Africans together with Huawei could rule the world, but we would have to see each other as equals, not as one person smart and the other food.",
  },

  {
    name: "DWDM Optical Networks from Success Builders International",
    year: 2016,
    reason: "Good course to sound smart.",
  },
  {
    name: "Effective Technical Report Writing For Engineers & Technicians from BMK advanced corporate training",
    year: 2014,
    reason:
      "This course taught good structure and nice tricks of how to be understood in report writing format. Simplified telling people what is in your head on paper. I recommend it to everyone.",
  },
  {
    name: "Introduction to railway projects and processes from Transnet",
    year: 2014,
    reason:
      "Good project on project management at small scale in a parastatal environment.",
  },
];
export const navTitles = [
  "About",
  "Skills",
  "Achieve",
  "Proj",
  "Exper",
  "Educa",
  "Passions",
  "Ref",
];
export const CCTV = function () {
  const cctv_struct = {
    project_type: "CCTV and campus network",
    responsibilities: [
      "Developed conceptual plan and presented it to executives and EXCO",
      "Conducted civil, communication and network surveys nationally",
      "Generated network designs, technical tender, risk, operational heal, training and reqruitment documents",
      "Requested for funds for the project",
      "executed technical tender evalation and selection",
      "Managed projects management",
      "Executed maintenance at 3 of the 33 locations",
      "Trained new team members on maintenance",
      "etc.",
    ],
    human_resources: [
      "use i found telecoms maintenance teams onsite that knew the environment and could show me around and share with me what the currently deployed network looked like and where i could install my own fibre network and device to jump onto their netowrk",
      " i used the national operating centre to request the configuration of E1 network circuits to facilitate the translocation of traffic to centralized locations",
      "project managers remotely deployed in areas who could manage close deployment of project",
      " training centres where i could send all the training material i created as i couldnt use branded material due to intellectual property concerns",
      " i used locally available electrical teams that had records of power reticulation in area",
      "i used union members in area to introduce project and neighbourhood",
      "i used safety officials in area with records of historical concerns",
      "i used local manager to understand movement around the area, movement in relation to how people work in the area as well as where theft was happening",
      "i used security manager to understand their plans for the area and historical experiences on crime",
      "i used operational health and safety as well as risk officials to take forward concerns i had identified",
      "i used a supply chain services official to advertise the tender documents i generated and facilitate evaluation of tender and other non-technical parts of the tender that i was not allowed to touch",
      "i used security senior management teams to get me to investment commitees EXCO etc",
      "i used security department finance manager to facilitate the year on year budgeting of the project.",
      "etc.",
    ],
    getIcon() {
      return L.icon({
        iconUrl: cctvImg,
        iconSize: [25, 25],
        iconAnchor: [25, 50],
      });
    },

    body_modal() {
      return (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>{this.name}</h1>
          <p>
            I was personally responsible for facilitating the deployment,
            ensuring maintenance and training of team of a campus network
            supporting security systems, of initially CCTV systems (cameras,
            network video recorders), but could later support any IP orientated
            systems as well as centralize them to a key national point. With
            respect to technical work i executed and human resources i used
            there are 2 lists below. FEL was the over-aching methodology used
            from project concept to close out.
          </p>
          <div>
            <img src={adm} width="60px" height="30px" />
            <img src={campus} width="60px" height="30px" />
          </div>
          <Accordion defaultActiveKey={0} style={{ width: "500px" }}>
            <Accordion.Item>
              <Accordion.Header>Responsibilities</Accordion.Header>
              <Accordion.Body>
                <ol>{respo}</ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <Accordion defaultActiveKey={0} style={{ width: "500px" }}>
            <Accordion.Item>
              <Accordion.Header>Human resources</Accordion.Header>
              <Accordion.Body>
                <ol>
                  {this.human_resources.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ol>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      );
    },
    popup_content() {
      return (
        <div>
          <h1>
            {this.name} : {this.project_type}
          </h1>
        </div>
      );
    },
    title_modal() {
      return `${this.name} : ${this.project_type}`;
    },
  };

  const locations = [
    {
      name: "Germiston",
      lat: 0,
      lng: 0,
    },
    { name: "Isando", lat: 0, lng: 0 },
    { name: "Braamfontein", lat: 0, lng: 0 },
    { name: "Johannesburg", lat: 0, lng: 0 },
    { name: "Koedoespoort", lat: 0, lng: 0 },
    { name: "Durban", lat: 0, lng: 0 },
    { name: "Richards bay", lat: 0, lng: 0 },
    { name: "Ermelo", lat: 0, lng: 0 },
    { name: "Esselenpark", lat: 0, lng: 0 },
    { name: "Sentrarand", lat: 0, lng: 0 },
    { name: "Ladysmith", lat: 0, lng: 0 },
    { name: "Bellville", lat: 0, lng: 0 },
    { name: "Saldanha", lat: 0, lng: 0 },
    { name: "Klawer", lat: 0, lng: 0 },
    { name: "Lydenburg", lat: 0, lng: 0 },
    { name: "Newcastle", lat: 0, lng: 0 },
    { name: "Komatipoort", lat: 0, lng: 0 },
    { name: "Polokwane", lat: 0, lng: 0 },
    { name: "Bethlehem", lat: 0, lng: 0 },
    { name: "Danskraal", lat: 0, lng: 0 },
    { name: "Sasolburg", lat: 0, lng: 0 },
    { name: "Millsite", lat: 0, lng: 0 },
    { name: "Springs", lat: 0, lng: 0 },
    { name: "Wentworth", lat: 0, lng: 0 },
    { name: "Parktown", lat: 0, lng: 0 },
  ];
  locations.forEach((item) => {
    //item.prototype.cctv = cctv_struct;
    //Object.assign(item, cctv_struct);
    return { ...item, ...cctv_struct };
  });
  return locations;
};
