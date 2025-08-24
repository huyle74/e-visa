import prisma from "@/prisma/prisma";
import {
  Eligibility,
  Application,
  ApplyInformation,
  TravelInformation,
} from "@prisma/client";

export const visaApplicationRepo = {
  async create(userId: string): Promise<Application> {
    try {
      const createApplication = await prisma.application.create({
        data: { userId },
      });
      return createApplication;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create new application");
    }
  },

  async findOne(id: string) {
    try {
      const find = await prisma.application.findUnique({ where: { correlationId: id } });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot find application");
    }
  },
};

export const eligibiltyRepo = {
  async create(applicationId: string, data: any): Promise<Eligibility> {
    try {
      const newEligibilty = await prisma.eligibility.create({
        data: { ...data, applicationId },
      });
      return newEligibilty;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create Eligibilty form");
    }
  },

  async update(applicationId: string, data: any): Promise<Eligibility> {
    try {
      const update = await prisma.eligibility.update({
        where: { applicationId },
        data,
      });
      return update;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot Update Eligibilty form");
    }
  },

  async findOne(applicationId: string): Promise<Eligibility | null> {
    try {
      const find = await prisma.eligibility.findUnique({
        where: { applicationId },
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot find this Eligibilty form");
    }
  },
};

// 2ND step applyInformation
export const applyInformationRepo = {
  async create(applicationId: string, data: any): Promise<ApplyInformation> {
    try {
      const createNew = await prisma.applyInformation.create({
        data: { ...data, applicationId },
      });
      return createNew;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create Application information form");
    }
  },

  async findOne(applicationId: string): Promise<ApplyInformation | null> {
    try {
      const find = await prisma.applyInformation.findUnique({
        where: { applicationId },
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot find this Eligibilty form");
    }
  },

  async update(applicationId: string, data: any): Promise<ApplyInformation> {
    try {
      const update = await prisma.applyInformation.update({
        where: { applicationId },
        data,
      });
      return update;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create Application information form");
    }
  },
};

export const travelInfoRepos = {
  async create(applicationId: string, data: any): Promise<TravelInformation> {
    try {
      const create = await prisma.travelInformation.create({
        data: { ...data, applicationId },
      });

      return create;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create travel information form");
    }
  },

  async findOne(applicationId: string) {
    try {
      const find = await prisma.travelInformation.findUnique({
        where: { applicationId },
      });
      return find;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create travel information form");
    }
  },

  async update(applicationId: string, data: any) {
    try {
      const update = await prisma.travelInformation.update({
        data,
        where: { applicationId },
      });
      return update;
    } catch (error) {
      console.log(error);
      throw new Error("Cannot create travel information form");
    }
  },
};
