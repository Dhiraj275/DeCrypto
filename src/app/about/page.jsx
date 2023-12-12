"use client"
import MainCover from "@/components/MainCover";

export default function Page({ params }) {


    return (
        <MainCover>
            <div className="about">
                <div className="section portfolio">
                    <img src="/images/portfolio/portfolio_bg.svg" alt="" />
                    <div className='detail'>
                        <div>
                            <span className='title bold'>Welcome to <span className="theme-text">DeCrypto</span></span> <br />
                        </div>
                    </div>
                </div>

                <section>
                    <h2><span>My Vision</span></h2>
                    <p>
                        Hey there! I'm <span>Dhiraj Prajapati</span>, and this is my personal project dedicated to exploring the fascinating
                        world of cryptocurrencies. I envisioned a space where users could access real-time data, monitor market
                        trends, and manage their own crypto watchlist seamlessly.
                    </p>
                </section>

                <section>
                    <h2><span>What You'll Find Here</span></h2>
                    <ul>
                        <li><strong>Comprehensive Crypto Stats:</strong> Dive into live data on various cryptocurrencies,
                            from prices to market capitalization, empowering you to make informed decisions.</li>
                        <li><strong>Personalized Watchlist:</strong> Tailor your crypto experience by curating a watchlist
                            of your favorite assets, and receive updates on their performance effortlessly.</li>
                    </ul>
                </section>

                <section>
                    <h2><span>Technology Stack</span></h2>
                    <p>
                        I've employed cutting-edge technologies and tools, such as <span>Next.Js</span>, <span>MUI</span>, <span>Node.js</span>, <span>Express.JS</span> and <span>Firebase</span> to ensure a smooth
                        and intuitive user experience. From frontend frameworks to backend solutions, every aspect of this
                        project has been crafted with attention to detail and usability in mind.
                    </p>
                </section>

                <section>
                    <h2><span>My Mission</span></h2>
                    <p>
                        My goal is to continually enhance this project, incorporating new features and functionalities to
                        better serve the crypto community. I'm dedicated to providing a user-friendly interface that
                        simplifies the complexities of the crypto world.
                    </p>
                </section>

                <section>
                    <h2><span>Join Me</span></h2>
                    <p>
                        Explore the insights, tools, and features I've developed. Whether you're a crypto enthusiast, trader,
                        or simply curious about digital assets, I invite you to explore, engage, and be part of this journey!
                    </p>
                </section>
            </div>
        </MainCover>
    )
}
