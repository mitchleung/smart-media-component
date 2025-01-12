import styles from "./page.module.css";
import SmartMedia from "./components/SmartMedia";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>Smart Media test</h1>
        <p>To test smart media with localhost server, install <a href="https://www.npmjs.com/package/http-server" target="_blank">http-server</a> locally and serve from public as root with
        </p>
        <pre>
          http-server ./public --port 8080 --cors
        </pre>
        <h2>video</h2>
        <SmartMedia
          mediaType="video"
          loading='lazy'
          controls={true}
          muted={true}
          loop={true}
          autoPlay={true}
          className="full-width-media"
          src="https://nauseating-trains.surge.sh/sample-video-1280x720-1mb.mp4"
          alt="Sample mp4"
        />

        <h2>image</h2>
        <SmartMedia
          mediaType="image"
          loading='lazy'
          className="full-width-media"
          src="https://nauseating-trains.surge.sh/photos/19216317/pexels-photo-19216317/free-photo-of-tower-of-the-saint-jacob-of-nisibis-church-gyumri-armenia.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Photo by Uliana Denisova: https://www.pexels.com/photo/tower-of-the-saint-jacob-of-nisibis-church-gyumri-armenia-19216317/"
        />


      </main>
      <footer className={styles.footer}>
        meh
      </footer>
    </div>
  );
}
