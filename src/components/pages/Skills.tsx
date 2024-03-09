import styles from "../../app/skills/skills.module.css"

export default function Skills() {
    return (
        <main className="flex justify-center items-center mt-5">
            <div className={styles.wrapper}>
                <div className="text-white font-[500] grid lg:grid-cols-[repeat(4,_1fr)] lg:grid-rows-[repeat(3,_100px)] grid-cols-[repeat(2,_1fr)] grid-rows-[repeat(3,_100px)] lg:mt-0 mt-80">
                    <div className={styles.skills} id='html'>
                        <div className={styles.details}>
                            <span>HTML</span>
                            <span>90%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.html_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='css'>
                        <div className={styles.details}>
                            <span>CSS</span>
                            <span>75%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.css_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='javascript'>
                        <div className={styles.details}>
                            <span>Javascript</span>
                            <span>60%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.javascript_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='nextjs'>
                        <div className={styles.details}>
                            <span>NextJS</span>
                            <span>90%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.nextjs_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='reactjs'>
                        <div className={styles.details}>
                            <span>ReactJS</span>
                            <span>80%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.reactjs_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='angularjs'>
                        <div className={styles.details}>
                            <span>AngularJS</span>
                            <span>20%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.angularjs_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='java'>
                        <div className={styles.details}>
                            <span>Java</span>
                            <span>65%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.java_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='java'>
                        <div className={styles.details}>
                            <span>Flutter</span>
                            <span>20%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.flutter_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='java'>
                        <div className={styles.details}>
                            <span>Figma</span>
                            <span>60%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.figma_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='java'>
                        <div className={styles.details}>
                            <span>Sass/Scss</span>
                            <span>80%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.sass_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='java'>
                        <div className={styles.details}>
                            <span>Tailwindcss</span>
                            <span>80%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.tailwind_bar}></div>
                        </div>
                    </div>
                    <div className={styles.skills} id='java'>
                        <div className={styles.details}>
                            <span>Typescript</span>
                            <span>50%</span>
                        </div>
                        <div className={styles.bar}>
                            <div className={styles.typescript_bar}></div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}