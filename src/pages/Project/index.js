import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import HomeBack from '~/components/HomeBack';
import api from '~/services/api';
import { completeLoadBar } from '~/store/modules/loadBar/actions';
import { setCurrent } from '~/store/modules/page/actions';

import { Container } from './styles';

function Project({ match: { params } }) {
  const { slug } = params;
  const dispatch = useDispatch();
  const currentPage = useSelector(state => state.page.current);

  const [project, setProject] = useState(false);

  useEffect(() => {
    async function getProject() {
      if (slug) {
        const response = await api.get(`/projects?slug=${slug}`);
        setProject(response.data[0]);
      }
    }
    getProject();
  }, [setProject, slug]);

  useEffect(() => {
    dispatch(completeLoadBar());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrent('Projeto'));
  }, [dispatch]);

  return (
    <Container>
      {currentPage !== 'Home' && <HomeBack projectId={project.id} />}
      <h1>{project.title}</h1>
      <img src={project.banner} alt="" />
      <img src={project.banner} alt="" />
      <img src={project.banner} alt="" />
      <img src={project.banner} alt="" />
      <img src={project.banner} alt="" />
    </Container>
  );
}
Project.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ slug: PropTypes.string }).isRequired,
  }).isRequired,
};

export default Project;
