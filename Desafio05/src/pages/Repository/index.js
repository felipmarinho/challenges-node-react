import React, { Component } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, Paginator, State } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
    page: 1,
    filterIndex: 0,
    filters: [
      { label: 'Todas', state: 'all', active: true },
      { label: 'Abertas', state: 'open', active: false },
      { label: 'Concluídas', state: 'closed', active: false },
    ],
  };

  async componentDidMount() {
    await this.getRepositoryDetail();
  }

  async getRepositoryDetail() {
    this.setState({
      loading: true,
    });
    const { match } = this.props;
    const { page } = this.state;
    const { filterIndex } = this.state;
    const { filters } = this.state;
    const repoName = decodeURIComponent(match.params.repository);
    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          per_page: 30,
          page,
          state: filters[filterIndex].state,
        },
      }),
    ]);
    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  nextPage = async () => {
    this.state.page += 1;
    await this.getRepositoryDetail();
  };

  backPage = async () => {
    this.state.page -= 1;
    await this.getRepositoryDetail();
  };

  handleIssueFilter = async index => {
    const { filters } = this.state;

    filters.map((filter, i) => {
      if (index === i) {
        filter.active = true;
      } else {
        filter.active = false;
      }
    });

    await this.setState({
      page: 1,
      filterIndex: index,
      loading: true,
    });

    this.getRepositoryDetail();
  };

  render() {
    const { repository, issues, loading, page, filters } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <State>
          {filters.map((filter, index) => (
            <button
              type="button"
              disabled={filter.active}
              key={filter.state}
              onClick={() => this.handleIssueFilter(index)}
            >
              {filter.label}
            </button>
          ))}
        </State>

        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  <p>{issue.user.login}</p>
                </strong>
              </div>
            </li>
          ))}
        </IssueList>

        <Paginator>
          <button type="button" disabled={page < 2} onClick={this.backPage}>
            <FaAngleLeft color="#FFF" size={14} />
          </button>
          <span>Página: {page}</span>
          <button type="button" onClick={this.nextPage}>
            <FaAngleRight color="#FFF" size={14} />
          </button>
        </Paginator>
      </Container>
    );
  }
}
