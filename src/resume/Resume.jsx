import React, { useEffect, useMemo, useRef, useState } from 'react'
import styles from './index.module.css'

const resumeData = {
  name: '赵宇峰',
  profession: 'iOS/前端',
  sex: '男',
  born: '1994年8月',
  place: '金华.浦江',
  placeUrl: 'https://baike.baidu.com/item/%E6%B5%A6%E6%B1%9F%E5%8E%BF/8510791',
  university: '聊城大学',
  universityUrl: 'https://www.lcu.edu.cn/xxgk/ldjj/index.htm',
  major: '信息计算科学',
  hobby: '打篮球，骑自行车，陪家人打麻将',
  skill: '可独立开发iOS、Web前端、小程序，熟悉Objective-C、Swift、JavaScript、TypeScript、Dart语言，熟悉SwiftUI、Flutter、Vue、React框架，熟悉一些3D开发，如SceneKit、ARKit、Three.js，乐于学习新的东西。',
  experience: [
    {
      id: '1',
      company: "杭州麦扑文化创意有限公司",
      companyUrl: "https://www.worldmaipu.com/",
      address: "杭州.钱塘区",
      begin: "2017.11",
      end: '2024.03',
      content: `<div>公司主营的APP<a target='_blank' href='https://apps.apple.com/cn/app/id1274907625'>小鹿导游</a>的iOS端的开发和迭代；</div><div>给各地旅游局或景区开发的APP的iOS端、微信小程序、部分H5的工作。</div><div>前几年以iOS端开发为主，后几年APP开发的需求减少，小程序开发的工作较多。</div>`,
    },
    {
      id: '2',
      company: "惠美网络科技有限公司",
      address: '金华义乌',
      begin: "2015.9",
      end: '2017.10',
      content: "独立开发和迭代一个电商APP惠美商城的iOS端。",
    }
  ],
  phone: "15058570273",
  wechat: 'zyf15058570273',
  email: '1445059274@qq.com',
  projects: [
    {
      id: '1',
      name: '小鹿导游',
      beigin: '2017.12',
      end: '2023.08',
      icon: '/app1.webp',
      tags: ['iOS', 'Swift'],
      link: 'https://apps.apple.com/cn/app/id1274907625',
      description: '一款旅游App。1.通过地图上的自定义瓦片，给热门景区添加了手绘地图；2.给游客提供景区的游览线路和需付费的语音讲解功能。',
    },
    {
      id: '2',
      name: '景点导游',
      beigin: '2019.11',
      end: '2021.04',
      icon: '/app2.webp',
      tags: ['iOS', 'Swift', 'SwiftUI'],
      link: 'https://apps.apple.com/cn/app/id1492789139',
      description: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    },
    {
      id: '3',
      name: '数字游戏',
      beigin: '2017.09',
      end: '2017.11',
      icon: '/app3.png',
      tags: ['iOS', '个人开发', '广告AdMob', '已下架'],
      link: '',
      description: '',
    },
    {
      id: '13',
      name: '走读吴兴',
      beigin: '2021.09',
      end: '2021.12',
      icon: '/app13.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/13.jpg',
      description: '',
    },
    {
      id: '7',
      name: '泰顺红色研学',
      beigin: '2023.04',
      end: '2023.07',
      icon: '/app7.jpg',
      tags: ['微信小程序', "学校教育"],
      link: '/miniprogram/7.jpg',
      description: '',
    },
    {
      id: '17',
      name: '杭州上城区导览亚运版',
      beigin: '',
      end: '',
      icon: '/app17.jpg',
      tags: ['Web', 'Vue3', '已下线'],
      link: '',
      description: '',
    },
    {
      id: '4',
      name: '畅游沈北',
      beigin: '2020.05',
      end: '2020.08',
      icon: '/app4.png',
      tags: ['iOS', 'Objective-C', '已下架'],
      link: 'https://www.duote.com/ios/606021.html',
      description: '',
    },
    {
      id: '5',
      name: '漫游兰州',
      beigin: '2019.02',
      end: '2019.05',
      icon: '/app5.jpg',
      tags: ['iOS', 'Objective-C', '已下架'],
      link: '',
      description: '',
    },
    {
      id: '6',
      name: '惠美生活',
      beigin: '2015.10',
      end: '2017.09',
      icon: '/app6.jpg',
      tags: ['iOS', '商城', '已下架'],
      link: 'http://www.downza.cn/iphone/198689.html',
      description: '',
    },
    {
      id: '8',
      name: '碳富码',
      beigin: '2022.08',
      end: '2022.11',
      icon: '/app8.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/8.jpg',
      description: '',
    },
    {
      id: '11',
      name: '智游凤凰',
      beigin: '2021.12',
      end: '2022.03',
      icon: '/app11.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/11.jpg',
      description: '',
    },
    {
      id: '9',
      name: '小红印',
      beigin: '2021.04',
      end: '2021.08',
      icon: '/app9.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/9.jpg',
      description: '',
    },
    {
      id: '15',
      name: '敬亭山景区',
      beigin: '2020.11',
      end: '2021.01',
      icon: '/app15.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/15.jpg',
      description: '',
    },
    {
      id: '12',
      name: '智游苏仙',
      beigin: '2020.06',
      end: '2020.9',
      icon: '/app12.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/12.jpg',
      description: '',
    },
    {
      id: '14',
      name: '清风之旅杭州上城',
      beigin: '2020.01',
      end: '2020.04',
      icon: '/app14.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/14.jpg',
      description: '',
    },
    {
      id: '10',
      name: '长沙世界之窗导览',
      beigin: '2019.09',
      end: '2020.01',
      icon: '/app10.jpg',
      tags: ['微信小程序'],
      link: '/miniprogram/10.jpg',
      description: '',
    },
    {
      id: '16',
      name: '曹娥江文旅一点通',
      beigin: '2019.07',
      end: '2019.09',
      icon: '/app16.jpg',
      tags: [''],
      link: '/miniprogram/16.jpg',
      description: '',
    },



  ]
}

function Project({ project, show }) {
  return <div className={`${show ? styles.card : styles.hiddenCard} ${styles.project}`}>
    <a href={project.link} target='_blank' className={styles.flex} style={{ textDecoration: 'none', pointerEvents: project.link ? 'auto' : 'none' }}>
      <img src={project.icon} className={styles.appIcon} style={{ alignSelf: 'flex-start' }} />
      <div className={styles.auto} style={{ margin: '0 10px' }}>
        <div className={styles.appName}>{project.name}</div>
        <div className={styles.flex} style={{ flexWrap: 'wrap' }}>
          {
            project.tags.map(tag => {
              return <div className={styles.appTag} key={tag}>{tag}</div>
            })
          }
        </div>
      </div>
      {project.link ? <svg viewBox="0 0 1024 1024" width="24" height="24"><path d="M283.648 174.081l57.225-59.008 399.479 396.929-399.476 396.924-57.228-59.004 335.872-337.92z" fill="#e6e6e6" p-id="4216" /></svg> : null}
    </a>
    <div className={styles.divider}></div>
    <div className={styles.cell} style={{ marginTop: '16px' }}>
      <div className={styles.textM}>项目时间</div>
      <div className={`${styles.text}`} style={{ marginLeft: '40px' }}>{project.beigin}—{project.end}</div>
    </div>
    <div className={styles.cell} style={{ marginTop: '16px' }}>
      <div className={styles.textM} style={{ marginTop: '12px' }}>项目介绍</div>
      <div className={`${styles.text} ${styles.auto} ${styles.card2}`} style={{ marginLeft: '40px' }} dangerouslySetInnerHTML={{ __html: project.description }}></div>
    </div>

    <div className={styles.cell} style={{ marginTop: '16px' }}>
      <div className={styles.textM} style={{ marginTop: '12px' }}>语言框架</div>
      <div className={`${styles.text} ${styles.auto} ${styles.card2}`} style={{ marginLeft: '40px' }} dangerouslySetInnerHTML={{ __html: project.description }}></div>
    </div>

    <div className={styles.cell} style={{ marginTop: '16px' }}>
      <div className={styles.textM} style={{ marginTop: '12px' }}>开发描述</div>
      <div className={`${styles.text} ${styles.auto} ${styles.card2}`} style={{ marginLeft: '40px' }} dangerouslySetInnerHTML={{ __html: project.description }}></div>
    </div>

  </div>
}

export default function Resume({
  onResumeShow,
  onResumeHide,
  show,
}) {
  const resumeRef = useRef()
  const [disabled, setDisabled] = useState(false)
  const [projectsColumn, setProjectsColumn] = useState(2)
  const [showAllProjects, setShowAllProjects] = useState(false)
  const projects = useMemo(() => {
    const list = resumeData.projects
    if (projectsColumn == 1) {
      return [list]
    }
    const res = [[], []]
    list.forEach((element, i) => {
      res[i % 2].push(element)
    });
    return res
  }, [projectsColumn])

  const showContent = () => {
    if (show) {
      if (resumeRef.current.scrollTop < 50) {
        resumeRef.current.scrollTop = 100
      }
      setDisabled(false)
      onResumeShow()
    } else {
      resumeRef.current.scrollTop = 0
    }
  }

  const hideContent = () => {
    setDisabled(true)
    onResumeHide()
    document.querySelector("#canvas").focus()
  }

  const onScroll = () => {
    if (resumeRef.current.scrollTop < 50) {
      if (!disabled) {
        hideContent();
        resumeRef.current.scrollTop = 0
      }
    } else if (disabled) {
      showContent()
    }
  }

  const onWindowResize = () => {
    if (window.innerWidth < 720) {
      setProjectsColumn(1)
    } else {
      setProjectsColumn(2)
    }
  }

  useEffect(() => {
    resumeRef.current.scrollTop = 100
    window.addEventListener('resize', onWindowResize)
    return () => {
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  useEffect(() => {
    if (show) {
      resumeRef.current.addEventListener('scroll', onScroll)
    }
    return () => {
      resumeRef.current.removeEventListener('scroll', onScroll)
    }
  }, [disabled, show])

  // useEffect(() => {
  //   if(!show) {
  //     console.log("resumeRef blur");
  //     resumeRef.current.blur()
  //     setTimeout(() => {
  //       document.querySelector("#canvas").focus()
  //     }, 1000);
  //   }
  // }, [show])
  return (
    <div className={`${styles.container} ${disabled ? styles.disabledContainer : ''} ${show ? '' : styles.hideContainer}`} id='resume' ref={resumeRef}>
      <div className={styles.topSpace}></div>
      <div onClick={disabled && show ? showContent : null} className={`${styles.content} ${disabled ? styles.disabledContent : ''}`}>


        <div className={styles.section}>
          <div className={styles.flex}>
          <div className={styles.title1}>{resumeData.name}</div>
          <div className={styles.profession}>{resumeData.profession}</div>
          </div>
          
          <div className={styles.divider}></div>
          <div className={styles.text}>
            <span>{resumeData.sex}</span>
            <span>，生于{resumeData.born}，</span>
            <a href={resumeData.placeUrl} target='_blank'> {resumeData.place} </a>
            ，本科，2016年毕业于
            <a href={resumeData.universityUrl} target='_blank'> {resumeData.university} </a>
            <span>{resumeData.major}专业，</span>
            <span>平时爱好{resumeData.hobby}。</span>
          </div>
        </div>

        <div className={styles.section}>
          <div className={styles.title2}>技能</div>
          <div className={styles.text}>{resumeData.skill}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.title2}>工作经历</div>
          {
            resumeData.experience.map(item => {
              return <div className={styles.card} key={item.id}>
                <div className={styles.cell} >
                  {
                    item.companyUrl ? <a className={styles.textL} href={item.companyUrl} target='_blank'>{item.company}</a> : <div className={styles.textL}>{item.company}</div>
                  }
                  <div className={styles.textS} style={{ marginLeft: '12px' }}>{item.begin}-{item.end}</div>
                </div>
                <div className={styles.cell} style={{ marginTop: '16px' }}>
                  <div className={styles.textM} style={{ marginTop: '12px' }}>工作内容</div>
                  <div className={`${styles.text} ${styles.auto} ${styles.card2}`} style={{ marginLeft: '40px' }} dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              </div>
            })
          }

        </div>

        <div className={styles.section}>
          <div className={styles.title2}>项目经历</div>
          <div className={styles.projects}>
            {
              projects.map((list, column) => {
                return <div className={styles.projectsColumn} key={column}>
                  {
                    list.map((project, i) => {
                      return <Project project={project} show={showAllProjects ? true : i < (6/projectsColumn)} key={project.id} />
                    })
                  }
                </div>
              })
            }
            {/* {
              resumeData.projects.slice(0, 5).map((project) => {
                return <Project project={project} show={true} key={project.id} />
              })
            }
            {
              resumeData.projects.slice(5).map((project) => {
                return <Project project={project} show={showAllProjects} key={project.id}  />
              })
            } */}
          </div>
          <div className={styles.projectsSwitch} onClick={() => { setShowAllProjects(!showAllProjects) }}>{showAllProjects ? '收起' : '显示全部'}</div>
        </div>

        <div className={styles.section}>
          <div className={styles.title2}>联系方式</div>
          <div style={{ display: 'flex', flexWrap: 'wrap' }} >
            <a href={`tel:${resumeData.phone}`} className={styles.card3}>
              <svg viewBox="0 0 1024 1024" version="1.1" p-id="12177" width="20" height="20"><path d="M744.448 959.232h-4.693333c-107.434667-5.546667-252.586667-106.666667-388.266667-270.677333l-50.090667-60.586667C165.717333 464.213333 94.634667 304.042667 111.274667 199.68 122.88 126.122667 232.362667 64 294.826667 64c30.72 0 41.984 15.36 45.824 24.490667 35.413333 62.890667 79.189333 172.202667 79.36 211.456v2.730666l-0.938667 2.56c-7.850667 20.650667-25.258667 30.549333-40.704 39.253334-20.309333 11.52-31.829333 19.029333-33.28 40.704-0.341333 6.570667 5.290667 36.522667 94.805333 146.773333l38.314667 46.250667c89.770667 105.898667 117.930667 117.333333 124.586667 118.272 21.674667 2.986667 31.829333-6.485333 47.36-23.552 11.946667-12.970667 25.344-27.733333 47.530666-30.976l2.816-0.426667 2.730667 0.597333c39.082667 8.277333 139.093333 72.789333 195.925333 120.661334 8.192 5.376 22.528 21.589333 11.178667 57.258666-17.749333 56.064-95.232 139.178667-165.888 139.178667z" fill="#fff" p-id="12178" /></svg>
              <div className={styles.text} style={{ marginLeft: '8px' }}>{resumeData.phone}</div>
            </a>
            <a href={`mailto:${resumeData.email}`} className={styles.card3}>
              <svg viewBox="0 0 1024 1024" version="1.1" p-id="12177" width="20" height="20"><path d="M149.6 171.8h691.9c47.2 0 85.9 37.7 86.5 83.9L495.7 493 63.5 256c0.4-46.4 38.8-84.2 86.1-84.2z m-86.1 175l-0.4 419.6c0 46.7 38.9 84.9 86.5 84.9h691.9c47.6 0 86.5-38.2 86.5-84.9V346.6L505.9 572.8c-6.5 3.5-14.3 3.5-20.7 0l-421.7-226z" fill="#fff" p-id="12178" /></svg>
              <div className={styles.text} style={{ marginLeft: '8px' }}>{resumeData.email}</div>
            </a>
            <a href='./wechat.jpg' target='_blank' className={styles.card3}>
              <svg viewBox="0 0 1024 1024" version="1.1" p-id="12177" width="20" height="20"><path d="M693.12 347.264c11.776 0 23.36 0.896 35.008 2.176-31.36-146.048-187.456-254.528-365.696-254.528C163.2 94.912 0 230.656 0 403.136c0 99.52 54.272 181.248 145.024 244.736L108.8 756.864l126.72-63.488c45.312 8.896 81.664 18.112 126.912 18.112 11.392 0 22.656-0.512 33.792-1.344-7.04-24.256-11.2-49.6-11.2-76.032C385.088 475.776 521.024 347.264 693.12 347.264zM498.304 249.024c27.392 0 45.376 17.984 45.376 45.248 0 27.136-17.984 45.312-45.376 45.312-27.072 0-54.336-18.176-54.336-45.312C443.968 266.944 471.168 249.024 498.304 249.024zM244.672 339.584c-27.2 0-54.592-18.176-54.592-45.312 0-27.264 27.392-45.248 54.592-45.248S289.92 266.944 289.92 294.272C289.92 321.408 271.872 339.584 244.672 339.584zM1024 629.76c0-144.896-145.024-262.976-307.904-262.976-172.48 0-308.224 118.144-308.224 262.976 0 145.28 135.808 262.976 308.224 262.976 36.096 0 72.512-9.024 108.736-18.112l99.392 54.528-27.264-90.624C969.728 783.872 1024 711.488 1024 629.76zM616.128 584.384c-17.984 0-36.224-17.92-36.224-36.224 0-18.048 18.24-36.224 36.224-36.224 27.52 0 45.376 18.176 45.376 36.224C661.504 566.464 643.648 584.384 616.128 584.384zM815.488 584.384c-17.856 0-36.032-17.92-36.032-36.224 0-18.048 18.112-36.224 36.032-36.224 27.264 0 45.376 18.176 45.376 36.224C860.864 566.464 842.752 584.384 815.488 584.384z" fill="#fff" p-id="12178" /></svg>
              <div className={styles.text} style={{ marginLeft: '8px' }}>{resumeData.wechat}</div>
            </a>
          </div>
        </div>


      </div>
    </div>
  )
}
