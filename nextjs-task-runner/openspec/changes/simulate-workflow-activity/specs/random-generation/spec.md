## ADDED Requirements

### Requirement: Random Workflow Seeding
The application MUST generate a random workflow graph structure upon page load to facilitate testing of the visualization and execution engine under various topological conditions.


#### Scenario: Generate generic workflow on load
Given the user navigates to `/workflow`
When the page component mounts
Then a new randomly generated workflow of 10-20 tasks is created
And the tasks form a valid Directed Acyclic Graph (DAG)
And the workflow is passed to the TaskRunner and Visualizer

#### Scenario: Visual variety
Given the user reloads the page
When the workflow is regenerated
Then the task names and dependencies are different from the previous load
