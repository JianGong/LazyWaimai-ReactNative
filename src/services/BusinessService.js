import BaseService from './BaseService';

class BusinessService extends BaseService {

  businesses(category = 1, page = 1) {
    const params = {
      category,
      page,
      size: 20
    };
    return super.request('businesses', 'GET', params);
  }
}

const businessService = new BusinessService();
module.exports = businessService;
