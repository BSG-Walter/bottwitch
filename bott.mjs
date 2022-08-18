import fs from "node:fs";
import {exec} from "node:child_process";
import util from "node:util";
import dotenv from 'dotenv'
dotenv.config()

async function reproducir(archivo){
    console.log("Reproduciendo: " + archivo)
    const execPromise = util.promisify(exec);
    try {
      //const {stdout, stderr} = await execPromise(`ffmpeg -stream_loop -1 -re -i "${archivo}" -f flv "rtmp://mia05.contribute.live-video.net/app/${process.env.KEY}"`);
      const {stdout, stderr} = await execPromise(`ffmpeg -stream_loop -1 -re -i "${archivo}" -acodec copy -vcodec copy -f flv "rtmp://mia05.contribute.live-video.net/app/${process.env.KEY}"`);
      //const {stdout, stderr} = await execPromise(`ffmpeg -stream_loop -1 -re -i "${archivo}" -pix_fmt yuvj420p -x264-params keyint=48:min-keyint=48:scenecut=-1 -b:v 4500k -b:a 128k -ar 44100 -acodec aac -vcodec libx264 -preset medium -crf 28 -f flv "rtmp://mia05.contribute.live-video.net/app/${process.env.KEY}"`);
    } catch (error) {
      console.log(error);
    }
}

while(true) {
    await reproducir("videos/dro.mp4");
}

// promisify exec