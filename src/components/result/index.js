import { h } from 'preact';

const Result = ({ result }) => (
	<div style={{
		padding: 10,
		margin: 10,
		background: 'white',
		boxShadow: '0 1px 5px rgba(0,0,0,0.5)'
	}}>
		<div>
			<a href={result.html_url} target="_blank">
				{result.full_name}
			</a>
			🌟<strong>{result.stargazers_count}</strong>
		</div>
		<p>{result.description}</p>
	</div>
);
export default Result;
