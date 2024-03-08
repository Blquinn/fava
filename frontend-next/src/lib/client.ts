class ApiClient {
  private baseUrl = 'http://localhost:5000/example-beancount-file/api'

  public async getIncomeStatement(): Promise<unknown> {
    const res = await fetch(`${this.baseUrl}/income_statement`);
    if (!res.ok) {
      throw `Error occurred while calling API: ${await res.text()}`;
    }

    return res.json();
  }
}

const client = new ApiClient();

export default client;
