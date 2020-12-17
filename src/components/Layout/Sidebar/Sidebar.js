import React, { Component } from "react";
import { NavLink } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";
// import { Link, NavLink } from 'react-router-dom';
// import RoutineService from '../../services/RoutineService';

import styles from "./Sidebar.module.scss";

class SideBar extends Component {
  // routineService = new RoutineService();

  constructor() {
    super();

    // this.routineList = this.routineList.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleInput = this.handleInput.bind(this);
    // this.handleDragOver = this.handleDragOver.bind(this);
    // this.handleDrop = this.handleDrop.bind(this);
    // this.handleDragEnd = this.handleDragEnd.bind(this);

    this.state = {
      routines: [],
      playlistName: "",
    };
  }

  componentDidMount() {
    // let user = this.props.auth.user.id;
    // this.routineService.getRoutines(user)
    //     .then(res => {
    //         this.setState({
    //             routines: res,
    //         })
    //     })
    //     .catch(err => { console.log(err) })
  }

  // routineList() {
  //     return this.state.routines.map((routine, key) => {
  //         return (
  //             <li key={key}><Link to={"/routine/" + routine._id}
  //                 onDragOver={this.handleDragOver}
  //                 onDrop={(e) => this.handleDrop(e, routine._id)}
  //                 onDragEnd={this.handleDragEnd}>{routine.name}</Link></li>
  //         )
  //     });
  // }

  // handleSubmit(e) {
  //     e.preventDefault();

  //     let newRoutine = {
  //         name: this.state.playlistName,
  //         user_id: this.props.auth.user.id
  //     }

  //     this.routineService.saveRoutine(newRoutine)
  //         .then(routine => {
  //             let routines = this.state.routines;

  //             routines.unshift(routine);
  //             this.setState({ routines: routines });
  //         })
  //         .catch(err => { console.log(err)})

  //     this.setState({ playlistName: '' });
  // }

  // handleInput(e) {
  //     this.setState({
  //         [e.target.name]: e.target.value
  //     })
  // }

  // handleDragOver(e) {
  //     e.preventDefault();
  //     e.target.classList.add("hover");
  // }

  // handleDragEnd(e) {
  //     e.preventDefault();
  //     console.log(e.target)
  //     e.target.classList.remove("hover");
  // }

  // handleDrop(e, routine) {
  //     let song = e.dataTransfer.getData("id");

  //     let data = {
  //         song_id: song,
  //         routine_id: routine
  //     }

  //     e.target.classList.remove("hover");

  //     this.routineService.addSong(data)
  //         .then(res => { console.log("song added!") })
  //         .catch(err => { console.log(err) })
  // }

  render() {
    return (
      <div className={styles.sidebar}>
        <div className={styles.sidebar__header}>
          <h1>MusicDB</h1>
          <i className="fas fa-record-vinyl"></i>
        </div>
        <div className={styles.sidebar__menu}>
          <ul className={styles.menu_items}>
            <li>
              <NavLink exact to="/" activeClassName={styles.active}>
                Dashboard
              </NavLink>
              <div className={styles.menu__icon}>
                <i className="fa fa-home"></i>
              </div>
            </li>
            <li>
              <NavLink exact to="/artists" activeClassName={styles.active}>
                Artists
              </NavLink>
              <div className={styles.menu__icon}>
                <i className="fas fa-users"></i>
              </div>
            </li>
            <li>
              <NavLink exact to="/songs" activeClassName={styles.active}>
                Songs
              </NavLink>
              <div className={styles.menu__icon}>
                <i className="fas fa-music"></i>
              </div>
            </li>
            <li>
              <NavLink exact to="/routines" activeClassName={styles.active}>
                Routines
              </NavLink>
              <div className={styles.menu__icon}>
                <i className="fas fa-stream"></i>
              </div>
            </li>
          </ul>
          <span className={styles.sidebar__separator}></span>
          <ul className={styles.menu_items}>
            <h3>Recent Routines</h3>
            <li>
              <NavLink exact to="/routines" activeClassName={styles.active}>
                The Classics
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/routines" activeClassName={styles.active}>
                new scales
              </NavLink>
            </li>
            <li>
              <NavLink exact to="/routines" activeClassName={styles.active}>
                Soothing Flugelhorn 12/20
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// SideBar.propTypes = {
//     auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(mapStateToProps)(SideBar);

export default SideBar;
