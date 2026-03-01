import React from 'react';
import Link from "next/link";
import styles from "./VideoCard.module.css";
import { Subhead } from "../Typography/Typography";

interface VideoCardProps {
  slug: string;
  thumbnail: string;
  title: string;
}

const VideoCard: React.FC<VideoCardProps> = ({ slug, thumbnail, title }) => {
  return (
    <div className={styles.cardWrapper}>
      <Link href={`watch/${slug}`}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img alt={title} loading="lazy" src={thumbnail} />
          </div>
          <div className={styles.titleWrapper}>
            <Subhead variant='3'>
              {title}
            </Subhead>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;
