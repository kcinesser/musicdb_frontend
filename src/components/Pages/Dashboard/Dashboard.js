import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import styles from "./Dashboard.module.scss";
import { Link } from "react-router-dom";

const data = {
  week: [
    {
      name: "Sun",
      Total: 1,
    },
    {
      name: "Mon",
      Total: 2,
    },
    {
      name: "Tue",
      Total: 2,
    },
    {
      name: "Wed",
      Total: 1.5,
    },
    {
      name: "Thur",
      Total: 1,
    },
    {
      name: "Fri",
      Total: 0,
    },
    {
      name: "Sat",
      Total: 0,
    },
  ],
  month: [
    {
      name: "1",
      Total: 3,
    },
    {
      name: "2",
      Total: 1.5,
    },
    {
      name: "3",
      Total: 1.25,
    },
    {
      name: "4",
      Total: 1,
    },
    {
      name: "5",
      Total: 2.5,
    },
    {
      name: "6",
      Total: 1,
    },
    {
      name: "7",
      Total: 0.75,
    },
    {
      name: "8",
      Total: 3,
    },
    {
      name: "9",
      Total: 1.5,
    },
    {
      name: "10",
      Total: 1.25,
    },
    {
      name: "11",
      Total: 1,
    },
    {
      name: "12",
      Total: 2.5,
    },
    {
      name: "13",
      Total: 1,
    },
    {
      name: "14",
      Total: 2,
    },
    {
      name: "15",
      Total: 2,
    },
    {
      name: "16",
      Total: 1.5,
    },
    {
      name: "17",
      Total: 1,
    },
    {
      name: "18",
      Total: 0,
    },
    {
      name: "19",
      Total: 0,
    },
    {
      name: "20",
      Total: 0,
    },
    {
      name: "21",
      Total: 0,
    },
    {
      name: "22",
      Total: 0,
    },
    {
      name: "23",
      Total: 0,
    },
    {
      name: "24",
      Total: 0,
    },
    {
      name: "25",
      Total: 0,
    },
    {
      name: "26",
      Total: 0,
    },
    {
      name: "27",
      Total: 0,
    },
    {
      name: "28",
      Total: 0,
    },
    {
      name: "29",
      Total: 0,
    },
    {
      name: "30",
      Total: 0,
    },
    {
      name: "31",
      Total: 0,
    },
  ],
  year: [
    {
      name: "Jan",
      Total: 28,
    },
    {
      name: "Feb",
      Total: 32,
    },
    {
      name: "Mar",
      Total: 20,
    },
    {
      name: "Apr",
      Total: 15,
    },
    {
      name: "May",
      Total: 25,
    },
    {
      name: "Jun",
      Total: 32,
    },
    {
      name: "Jul",
      Total: 33,
    },
    {
      name: "Aug",
      Total: 40,
    },
    {
      name: "Sep",
      Total: 22,
    },
    {
      name: "Oct",
      Total: 48,
    },
    {
      name: "Nov",
      Total: 25,
    },
    {
      name: "Dec",
      Total: 30,
    },
  ],
};

const labels = {
  week: "Dec 13 - Dec 19",
  month: "December, 2020",
  year: "2020",
};

class Dashboard extends Component {
  static propTypes = {
    artists: PropTypes.array.isRequired,
    songs: PropTypes.array.isRequired,
  };

  state = {
    activeSlide: 1,
    data: "week",
  };

  songList = () => {
    return this.props.songs
      .sort((a, b) => {
        if (a.created_at < b.created_at) {
          return 1;
        }
        if (a.created_at > b.created_at) {
          return -1;
        }

        return 0;
      })
      .slice(0, 10)
      .map((song) => {
        return (
          <div key={song.id} className={styles.widget__item}>
            <div>
              <p>
                <Link to={`/song/${song.id}`}>{song.title}</Link>
              </p>
              <p>{song.artist_name}</p>
            </div>
            <div>
              <p>{song.album}</p>
            </div>
          </div>
        );
      });
  };

  artistList = () => {
    return this.props.artists
      .sort((a, b) => {
        if (a.created_at < b.created_at) {
          return 1;
        }
        if (a.created_at > b.created_at) {
          return -1;
        }

        return 0;
      })
      .slice(0, 10)
      .map((artist) => {
        return (
          <div
            key={artist.id}
            className={`${styles.widget__item} ${styles.artist}`}
          >
            <div className={styles.artist__left}>
              <div
                className={styles.widget__image}
                style={{ backgroundImage: `url(${artist.image_url})` }}
              ></div>
              <div>
                <p>
                  <Link to={`/artist/${artist.id}`}>{artist.name}</Link>
                </p>
              </div>
            </div>
            <div>
              <p> {artist.songs.length} song(s)</p>
            </div>
          </div>
        );
      });
  };

  setSlide = (index, data) => {
    this.setState({ activeSlide: index, data: data });
  };

  render() {
    return (
      <div className={styles.dashboard}>
        <h2>YOUR Dashboard</h2>
        <div className={styles.dashboard__container}>
          <div className={styles.widget__container}>
            <div className={styles.widget__inner}>
              <h3>Recent Artists</h3>
              {this.props.artists ? this.artistList() : ""}
            </div>
          </div>
          <div className={styles.widget__container}>
            <div className={styles.widget__inner}>
              <h3>Recent Songs</h3>
              {this.props.songs ? this.songList() : ""}
            </div>
          </div>
          <div className={styles.widget__container}>
            <div className={styles.widget__inner}>
              <h3>Your Stats</h3>
              <div className={styles.widget__controls}>
                <ul>
                  <li
                    className={
                      this.state.activeSlide === 1 ? styles.active : ""
                    }
                    onClick={() => this.setSlide(1, "week")}
                  ></li>
                  <li
                    className={
                      this.state.activeSlide === 2 ? styles.active : ""
                    }
                    onClick={() => this.setSlide(2, "month")}
                  ></li>
                  <li
                    className={
                      this.state.activeSlide === 3 ? styles.active : ""
                    }
                    onClick={() => this.setSlide(3, "year")}
                  ></li>
                </ul>
              </div>
              <p className={styles.graph__title}>{labels[this.state.data]}</p>
              <div>
                <BarChart
                  width={400}
                  height={320}
                  data={data[this.state.data]}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Total" fill="#1eeaa9" />
                </BarChart>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  artists: state.artists.artists,
  songs: state.songs.songs,
});

export default connect(mapStateToProps, {})(Dashboard);
